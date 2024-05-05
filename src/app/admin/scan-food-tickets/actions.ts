"use server";

import { getUserIDAndCode } from "@/amplify/function/utils/crytography";
import { getGroupNumber, getGroupNumberFromTime, getUserTimeSlot } from "@/amplify/function/utils/food-groups";
import client from "@/components/_Amplify/AmplifyBackendClient";

import { getLocalCalgaryTime } from "@/utils/date";


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
      const expectedGroupNumber = getGroupNumberFromTime(
        getLocalCalgaryTime(),
        foodEvent.Groups,
        foodEvent?.Start,
        foodEvent?.End,
      );
      const actualGroupNumber = getGroupNumber(
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
        const actualTimeSlot = getUserTimeSlot(
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
