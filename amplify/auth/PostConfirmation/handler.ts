import type { PostConfirmationTriggerHandler } from "aws-lambda";

import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient();

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const command = new AdminAddUserToGroupCommand({
    GroupName: "Participant",
    Username: event.userName,
    UserPoolId: event.userPoolId,
  });
  const response = await cognitoClient.send(command);
  if (response.$metadata.httpStatusCode === 200) {
    return event;
  } else {
    throw new Error("Failed to add user to group");
  }
};
