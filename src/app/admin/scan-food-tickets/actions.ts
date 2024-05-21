"use server";

import validator from "validator";

import { getUserIDAndCode } from "@/amplify/function/utils/crytography";
import { getCurrentCalgaryTime } from "@/amplify/function/utils/date";
import {
  getGroupNumber,
  getGroupNumberFromTime,
  getUserTimeSlot,
} from "@/amplify/function/utils/food-groups";
import client from "@/components/_Amplify/AmplifyBackendClient";

//verify if the food ticket is good, tells if the person can eat, and description of errors
export async function verifyFoodTicket(
  userCode: string,
  eventID: string,
  automaticMarking: boolean = true, //automatically mark the user as ate at food event, set as variable in case we might want to change in future
  timeSlot: number = -1,
): Promise<{
  canEat: boolean;
  description: string;
}> {
  const [userID] = getUserIDAndCode(userCode);

  const response = await client.queries.VerifyUserCode({
    userCode: userCode,
  });
  const response_body = response.data?.body;
  const json = JSON.parse(response_body as string);

  const valid = json["valid"];
  if (!valid) return { canEat: false, description: "Not a valid code" };

  if (!validator.isUUID(eventID)) {
    return {
      canEat: false,
      description: "Not a valid food event ID, must be a UUID",
    };
  }

  const { data: foodEvent, errors } = await client.models.FoodEvent.get({
    id: eventID,
  });

  //If food event does not exist or errors when finding
  if (!foodEvent || errors) {
    return {
      canEat: false,
      description: "Could not find the specified food event",
    };
  }
  // User has already at the event
  if (await hasAlreadyAteAtFoodEvent(userID, eventID)) {
    return {
      canEat: false,
      description: "Person has already ate at this event",
    };
  }
  // If the user is not in the correct time, they will still eat anyways, we will just let the scanner know that they should be at a different time
  const { description } = await isCorrectTimeSlot(userID, foodEvent, timeSlot);

  if (automaticMarking) {
    await setUserAsAttendedAtFoodEvent(userID, eventID);
  }
  return { canEat: true, description: description };
}

// check if the user has already ate at the food event.
async function hasAlreadyAteAtFoodEvent(userID: string, foodEventID: string) {
  try {
    // Query the UserFoodEventAttendance records for the given user and food event
    const attendanceRecords = await client.models.UserFoodEventAttendance.list({
      filter: {
        userId: { eq: userID },
        foodEventId: { eq: foodEventID },
      },
    });

    // Check if any records exist, indicating the user has attended the event
    return attendanceRecords.data.length > 0;
  } catch (error) {
    console.error(
      "Error checking if user has already attended the food event:",
      error,
    );
    throw error;
  }
}

// Check if the user is in the correct time slot
async function isCorrectTimeSlot(
  userID: string,
  foodEvent: any, //FIXME: if you know how to get around this, please fix it
  timeSlot: number = -1, //by default will be automatic, unless a specific timeslot was chosen
) {
  let currentGroupNumber = timeSlot;
  if (timeSlot === -1) {
    currentGroupNumber = getGroupNumberFromTime(
      getCurrentCalgaryTime(),
      foodEvent.groups,
      foodEvent.start || "",
      foodEvent.end || "",
    );
  }

  const userGroupNumber = getGroupNumber(
    userID,
    foodEvent.id,
    foodEvent.groups,
  );

  if (currentGroupNumber === userGroupNumber) {
    return {
      description: "valid code & correct timeslot",
    };
  } else {
    const actualTimeSlot = getUserTimeSlot(
      userID,
      foodEvent.id,
      foodEvent.groups,
      foodEvent.start || "",
      foodEvent.end || "",
    );

    return {
      description: `Person should be in timeslot ${actualTimeSlot}`,
    };
  }
}

//Sets user as eaten at the food event
async function setUserAsAttendedAtFoodEvent(
  userID: string,
  foodEventID: string,
) {
  try {
    // Create a new UserFoodEventAttendance record to represent the user's attendance
    const attendanceRecord = await client.models.UserFoodEventAttendance.create(
      {
        userId: userID,
        foodEventId: foodEventID,
      },
    );

    return attendanceRecord;
  } catch (error) {
    console.error("Error setting user as attended at food event:", error);
    throw error;
  }
}
