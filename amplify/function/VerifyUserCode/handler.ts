import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import { modelIntrospection } from "./amplifyconfiguration.json";

const MAX_TEAM_MEMBERS = 6;
Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT as string,
        region: process.env.AWS_REGION,
        defaultAuthMode: "iam",
        modelIntrospection: modelIntrospection as never,
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

const dataClient = generateClient<Schema>();

type ResolverArgs = { userCode: string, eventID: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {

  const user = await dataClient.models.User.get({ id: event.arguments.userId });
  
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
};

