import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { data } from "@/amplify/auth/PostConfirmation/amplify_outputs.json";
import { type Schema } from "@/amplify/data/resource";
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT as string, // replace with your defineData name
        region: process.env.AWS_REGION,
        defaultAuthMode: "identityPool",
        modelIntrospection: data.model_introspection as any,
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

const cognitoClient = new CognitoIdentityProviderClient();

export const dataClient = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log("event", event);
  const command = new AdminAddUserToGroupCommand({
    GroupName: "Participant",
    Username: event.userName,
    UserPoolId: event.userPoolId,
  });

  const cognitoGroupResponse = await cognitoClient.send(command);

  const DDBResponse = await dataClient.models.User.create({
    firstName: "",
    lastName: "",
    role: "Participant",
    id: event.request.userAttributes.sub,
    email: event.request.userAttributes.email,
    checkedIn: false,
    willEatMeals: false,
    allergies: "",
    institution: "",
    profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
  })
    .then((user) => {
      if (user.errors) {
        console.error(user.errors);
        throw new Error("Failed to create user in DB");
      }
      console.log("User created", user);
      return event;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

  if (cognitoGroupResponse.$metadata.httpStatusCode !== 200 && DDBResponse) {
    throw new Error("Failed to add user to group");
  }
  if (!DDBResponse) {
    throw new Error("Failed to create user in DB");
  }

  return event;
};
