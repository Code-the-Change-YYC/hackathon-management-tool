import { Amplify } from "aws-amplify";

import {
  AdminAddUserToGroupCommand,
  AdminListGroupsForUserCommand,
  AdminRemoveUserFromGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

import type { Schema } from "../../../data/resource";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT as string,
        region: process.env.AWS_REGION,
        defaultAuthMode: "iam",
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            sessionToken: process.env.AWS_SESSION_TOKEN as string,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  },
);

type Handler = Schema["addUserToGroup"]["functionHandler"];

const client = new CognitoIdentityProviderClient({});

export const handler: Handler = async (event) => {
  try {
    const { userId, groupName } = event.arguments;

    // Get the user current group
    const listGroupCommand = new AdminListGroupsForUserCommand({
      Username: userId,
      UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
    });
    const groupResponse = await client.send(listGroupCommand);

    console.log(groupResponse);

    // Remove the user from that group
    const removeFromGroupCommand = new AdminRemoveUserFromGroupCommand({
      Username: userId,
      GroupName: (groupResponse.Groups as { GroupName: string }[])[0]
        ?.GroupName,
      UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
    });
    await client.send(removeFromGroupCommand);

    // Add user to new group
    const addUserToGroupCommand = new AdminAddUserToGroupCommand({
      Username: userId,
      GroupName: groupName,
      UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
    });
    const response = await client.send(addUserToGroupCommand);

    console.log(response);

    return { statusCode: 200, body: { message: "User added" } };
  } catch (error) {
    return { statusCode: 500, body: { message: error } };
  }
};
