"use server";

import client from "@/components/_Amplify/AmplifyBackendClient";
import * as mutations from "../../../../mutations";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import { getUserIDAndCode, isValidAuthenticationCode } from "@/utils/cryptography";

export async function verifyFoodTicket(userCode: string, eventID: string) {
  try {
    const { data, errors } = await client.models.FoodEvent.get({ id: eventID });
    const [userID, mac] = getUserIDAndCode(userCode);
  
    // Check if the user has a meal with the same eventID
    if (data) {
      const hasUserInEvent = (await data.Attended()).data.some(
        (user) => user.id === userID,
      );
      if (hasUserInEvent) return { canEat: false, description: "User has already attended the event meal."}
    }

    console.log("userID is here " + userID)
    //Make sure their code is a valid one that has not been tampered with
    const isValidCode = await isValidAuthenticationCode(userID, mac);
    console.log("is valid? " + isValidCode)

    if (isValidCode == false){
      return { canEat: false, description: "The code is not valid, likely inputted wrong or tampered with"}
    }
    else
    {
      return { canEat: true, description: "The code is valid, great!"}
    }
  } 
  catch (error) {
    console.error('Error verifying food ticket:', error);
    return { canEat: false, description: "server backend error when trying to read ticket"}
  }
}