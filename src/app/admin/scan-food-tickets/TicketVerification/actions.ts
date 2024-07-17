"use server";

import { DateTime } from "luxon";
import validator from "validator";

import type { Schema } from "@/amplify/data/resource";
import { getMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";
import {
  getFoodGroupPositionNumber,
  getFoodGroupPositionNumberForTime,
  getTimeForFoodGroupPositionNumber,
} from "@/amplify/function/BusinessLogic/utils/food-groups";
import client from "@/components/_Amplify/AmplifyBackendClient";

/**
 * verify if the food ticket is good, tells if the person can eat, and description of errors
 */
export async function verifyFoodTicket(
  userCode: string,
  eventID: string,
  automaticMarking: boolean = true, //automatically mark the user as ate at food event
  timeSlot: number = -1,
): Promise<{
  canEat: boolean;
  description: string;
}> {
  try {
    const [userID] = getMessageAndCode(userCode);

    //Verify MAC
    const { data, errors: verificationErrors } =
      await client.queries.VerifyUserMessage({
        userCode: userCode,
      });

    if (verificationErrors || !data)
      return { canEat: false, description: "Cannot call the backend" };

    if (data.statusCode !== 200)
      return { canEat: false, description: "Not a valid code" };

    //Verify UUID
    if (!validator.isUUID(eventID)) {
      return {
        canEat: false,
        description: "Not a valid food event ID, must be a UUID",
      };
    }

    //get FoodEvent
    const { data: foodEvent, errors: foodEventErrors } =
      await client.models.FoodEvent.get({
        id: eventID,
      });

    //If food event does not exist or errors when finding
    if (foodEventErrors || !foodEvent) {
      return {
        canEat: false,
        description:
          "Could not find the specified food event, had trouble calling food event",
      };
    }
    const hasEaten = await hasAlreadyAteAtFoodEvent(userID, eventID);
    // User has already at the event
    if (hasEaten) {
      return {
        canEat: false,
        description: "Person has already ate at this event",
      };
    }

    //get user teamID
    const { data: user, errors: userErrors } = await client.models.User.get({
      id: userID,
    });
    if (userErrors || !user?.teamId) {
      return {
        canEat: false,
        description:
          "Unknown time slot, had trouble finding the team for the user",
      };
    }
    // If the user is not in the correct time, they will still eat anyways, we will just let the scanner know that they should be at a different time
    const { description, correct } = await isCorrectTimeSlot(
      user?.teamId,
      foodEvent,
      timeSlot,
    );

    //Mark user as eaten automatically if this is their timeslot
    if (automaticMarking && correct) {
      await setUserAsAttendedAtFoodEvent(userID, eventID);
    }
    return { canEat: true, description: description };
  } catch (error) {
    return {
      canEat: false,
      description: "Backend Error: " + error,
    };
  }
}

// check if the user has already ate at the food event.
async function hasAlreadyAteAtFoodEvent(userID: string, foodEventID: string) {
  // Query the UserFoodEventAttendance records for the given user and food event
  const attendanceRecords = await client.models.UserFoodEventAttendance.list({
    filter: {
      userId: { eq: userID },
      foodEventId: { eq: foodEventID },
    },
  });
  // Check if any records exist, indicating the user has attended the event
  return attendanceRecords.data.length > 0;
}
/**
 * Check if the user is in the correct time slot
 */
async function isCorrectTimeSlot(
  teamID: string,
  foodEvent: Schema["FoodEvent"]["type"], //FIXME: if you know how to get around this, please fix it
  timeSlot: number = -1, //by default will be automatic, unless a specific timeslot was chosen
) {
  let currentGroupPositionNumber = timeSlot;
  if (timeSlot === -1) {
    currentGroupPositionNumber = getFoodGroupPositionNumberForTime(
      DateTime.now().setZone(process.env.TIME_ZONE).toJSDate(),
      foodEvent.totalGroupCount,
      foodEvent.start,
      foodEvent.end,
    );
  }

  const userGroupPositionNumber = getFoodGroupPositionNumber(
    teamID,
    foodEvent.id,
    foodEvent.totalGroupCount,
  );

  if (currentGroupPositionNumber === userGroupPositionNumber) {
    return {
      description: "valid code & correct timeslot",
      correct: true,
    };
  } else {
    const actualTimeSlot = getTimeForFoodGroupPositionNumber(
      userGroupPositionNumber,
      foodEvent.totalGroupCount,
      foodEvent.start,
      foodEvent.end,
    );
    return {
      description: `Person should be in timeslot ${actualTimeSlot}, marked them as attended anyway.`,
      correct: true,
    };
  }
}
/**
 *  Sets user as eaten at the food event
 */
async function setUserAsAttendedAtFoodEvent(
  userID: string,
  foodEventID: string,
) {
  // Create a new UserFoodEventAttendance record to represent the user's attendance
  const attendanceRecord = await client.models.UserFoodEventAttendance.create({
    userId: userID,
    foodEventId: foodEventID,
  });
  return attendanceRecord;
}

/**
 *  Sets user as eaten at the food event from their QR mac
 */
export async function setUserAsAttendedAtFoodEventFromCode(
  userCode: string,
  foodEventID: string,
): Promise<boolean> {
  const [userID] = getMessageAndCode(userCode);
  // Create a new UserFoodEventAttendance record to represent the user's attendance
  const { errors } = await client.models.UserFoodEventAttendance.create({
    userId: userID,
    foodEventId: foodEventID,
  });
  if (errors) {
    return false;
  }
  return true;
}
