import type { AppSyncResolverHandler } from "aws-lambda";

import client from "@/components/_Amplify/AmplifyBackendClient";
import {
  getUserIDAndCode,
  isValidAuthenticationCode,
} from "@/utils/cryptography";

type ResolverArgs = { userCode: string; eventID: string };

type ResolverResult = {
  canEat: boolean;
  description: string;
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  const userCode = event.arguments.userCode;

  const [userID, mac] = getUserIDAndCode(userCode);

  //Make sure their code is a valid one that has not been tampered with
  const validCode = await isValidAuthenticationCode(userID, mac);
  if (validCode == false) {
    return {
      canEat: false,
      description:
        "Person has tampered with their QR code, or a bad read happened",
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
    };
  }

  const eventID = event.arguments.eventID;

  const { data, errors } = await client.models.FoodEvent.get({ id: eventID });

  let description = "User may eat!";
  // Check if the user has a meal with the same eventID
  if (data) {
    const hasUserInEvent = (await data.Attended()).data.some(
      (user) => user.id === userID,
    );
    description = hasUserInEvent
      ? "User has already attended the event meal."
      : description;
  }

  if (errors) {
    console.error(errors);
    return {
      canEat: false,
      description: "An error occurred while fetching user data.",
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    };
  }

  return {
    canEat: true,
    description: description,
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
