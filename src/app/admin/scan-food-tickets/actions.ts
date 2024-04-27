"use server";

import client from "@/components/_Amplify/AmplifyBackendClient";
import {
  getUserIDAndCode,
  isValidAuthenticationCode,
} from "@/utils/cryptography";
import {
  getGroupNumber,
  getGroupNumberFromTime,
  getUserTimeSlot,
} from "@/utils/food";

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
      const hasUserInEvent = (await foodEvent.Attended()).data.some(
        (user) => user.id === userID,
      );
      if (hasUserInEvent)
        return {
          canEat: false,
          description: "User has already attended the event meal.",
        };
    }

    //Make sure their code is a valid one that has not been tampered with
    const isValidCode = await isValidAuthenticationCode(userID, mac);

    if (isValidCode == false) {
      return {
        canEat: false,
        description:
          "The code is not valid, likely inputted wrong or tampered with",
      };
    } else {
      //check if the user is in the right time slot, can still eat if not in the right timeslot
      let expectedGroupNumber = getGroupNumberFromTime(
        new Date(),
        foodEvent.Groups,
        foodEvent?.Start,
        foodEvent?.End,
      );
      let actualGroupNumber = getGroupNumber(
        userID,
        foodEvent.id,
        foodEvent.Groups,
      );

      if (expectedGroupNumber == actualGroupNumber) {
        return {
          canEat: true,
          description: "Person is in the right place and time!",
        };
      } else {
        let actualTimeSlot = getUserTimeSlot(
          userID,
          foodEvent.id,
          foodEvent.Groups,
          foodEvent.Start,
          foodEvent.End,
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
