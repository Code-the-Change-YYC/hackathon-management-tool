import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import {
  AdminAddUserToGroupCommand,
  AdminListGroupsForUserCommand,
  AdminRemoveUserFromGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

import type { Schema } from "../../../data/resource";
import { updateUser } from "./graphql/mutations";

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

const dynamoClient = generateClient<Schema>();

export const handler: Handler = async (event) => {
  try {
    const { userId, groupName } = event.arguments;

    // Get the user current group
    const listGroupCommand = new AdminListGroupsForUserCommand({
      Username: userId,
      UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
    });
    const listGroupResponse = await client.send(listGroupCommand);

    if (listGroupResponse.Groups?.length === 0) {
      return {
        body: { value: `User not found` },
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
      };
    }

    // Remove the user from that group
    const removeFromGroupCommand = new AdminRemoveUserFromGroupCommand({
      Username: userId,
      GroupName: (listGroupResponse.Groups as { GroupName: string }[])[0]
        ?.GroupName,
      UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
    });
    const removeUserRepsonse = await client.send(removeFromGroupCommand);

    if (removeUserRepsonse.$metadata.httpStatusCode !== 200) {
      return {
        body: { value: `Error while removing user from group` },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      };
    }

    // Add user to new group
    const addUserToGroupCommand = new AdminAddUserToGroupCommand({
      Username: userId,
      GroupName: groupName,
      UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
    });
    const addUserResponse = await client.send(addUserToGroupCommand);

    if (addUserResponse.$metadata.httpStatusCode !== 200) {
      return {
        body: { value: `Error while adding user to group` },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      };
    }

    // Edit the data in dynamoDB
    const result = await dynamoClient.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userId,
          role: (listGroupResponse.Groups as { GroupName: string }[])[0]
            ?.GroupName,
        },
      },
    });

    if (!result.errors) {
      return {
        body: { value: `Success` },
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
      };
    } else {
      return {
        body: { value: `Error while updating database` },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      };
    }
  } catch (error) {
    return {
      body: { value: `Unhandled Internal Server Error` },
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    };
  }
};
