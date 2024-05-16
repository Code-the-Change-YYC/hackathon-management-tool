"use server";

import {
  getUserIDAndCode,
  isValidAuthenticationCode,
} from "@/amplify/function/utils/crytography";
import { getLocalCalgaryTime } from "@/amplify/function/utils/date";
import {
  getGroupNumber,
  getGroupNumberFromTime,
  getUserTimeSlot,
} from "@/amplify/function/utils/food-groups";
import client from "@/components/_Amplify/AmplifyBackendClient";

export async function verifyFoodTicket(userCode: string, eventID: string) {
  try {
    const { data: foodEvent, errors } = await client.models.FoodEvent.get({
      id: eventID,
    });

    if (errors) {
      return {
        canEat: false,
        description: "Could not find the specified food event",
      };
    }

    const [userID, mac] = getUserIDAndCode(userCode);

    // Check if the user has a meal with the same eventID
    if (foodEvent) {
      const hasUserInEvent = (await foodEvent.attended()).data.some(
        (user) => user.id === userID,
      );
      if (hasUserInEvent)
        return {
          canEat: false,
          description: "User has already attended the event meal.",
        };
    } else {
      console.error("Food event does not exist");
      return { canEat: false, description: "Food event does not exist" };
    }

    //Make sure their code is a valid one that has not been tampered with
    const isValidCode = await isValidAuthenticationCode(userID, mac);

    if (isValidCode === false) {
      return {
        canEat: false,
        description:
          "The code is not valid, likely inputted wrong or tampered with",
      };
    } else {
      //check if the user is in the right time slot, can still eat if not in the right timeslot
      const expectedGroupNumber = getGroupNumberFromTime(
        getLocalCalgaryTime(),
        foodEvent?.groups,
        foodEvent.start,
        foodEvent.end,
      );
      const actualGroupNumber = getGroupNumber(
        userID,
        foodEvent.id,
        foodEvent.groups,
      );

      if (expectedGroupNumber === actualGroupNumber) {
        return {
          canEat: true,
          description: "Person is in the right place and time!",
        };
      } else {
        const actualTimeSlot = getUserTimeSlot(
          userID,
          foodEvent.id,
          foodEvent.groups,
          foodEvent.start,
          foodEvent.end,
        );
        return {
          canEat: true,
          description: `Person should be in timeslot ${actualTimeSlot}`,
        };
      }
    }
  } catch (error) {
    console.error("Error verifying food ticket:", error);
    return { canEat: false, description: error };
  }
}
