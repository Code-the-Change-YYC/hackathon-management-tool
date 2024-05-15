import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "@/amplify/data/resource";

import {
  getUserIDAndCode,
  isValidAuthenticationCode,
} from "../utils/crytography";
import { getLocalCalgaryTime } from "../utils/date";
import {
  getGroupNumber,
  getGroupNumberFromTime,
  getUserTimeSlot,
} from "../utils/food-groups";
import { getFoodEvent } from "./graphql/queries";

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

const client = generateClient<Schema>({
  authMode: "iam",
});

type ResolverArgs = { userCode: string; eventID: string };

type ResolverResult = {
  body: { canEat: boolean; description: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

const header = { "Content-Type": "application/json" };

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  // const { data, errors } = await client.models.FoodEvent.get({
  //   id: event.arguments.eventID,
  // });

  const { data, errors } = await client.graphql({
    query: getFoodEvent,
    variables: {
      id: event.arguments.eventID,
    },
  });

  if (errors || !data.getFoodEvent) {
    return {
      body: {
        canEat: false,
        description: "Could not find the specified food event",
      },
      statusCode: 404,
      headers: header,
    };
  }

  const foodEvent = data.getFoodEvent;
  const [userID, mac] = getUserIDAndCode(event.arguments.userCode);

  // Check if the user has a meal with the same eventID
  // TODO: Readd this when Ana learns how to do this in Amplify
  // const hasUserInEvent = foodEvent.attended?.data.some(
  //   (user: { id: string }) => user.id === userID,
  // );
  const hasUserInEvent = false;
  if (hasUserInEvent)
    return {
      body: {
        canEat: false,
        description: "User has already attended the event meal.",
      },
      statusCode: 409,
      headers: header,
    };

  //Make sure their code is a valid one that has not been tampered with
  const isValidCode = await isValidAuthenticationCode(userID, mac);

  if (isValidCode === false) {
    return {
      body: {
        canEat: false,
        description:
          "The code is not valid, likely inputted wrong or tampered with",
      },
      statusCode: 422,
      headers: header,
    };
  } else {
    //check if the user is in the right time slot, can still eat if not in the right timeslot
    const expectedGroupNumber = getGroupNumberFromTime(
      getLocalCalgaryTime(),
      foodEvent.groups,
      foodEvent.start as string,
      foodEvent.end as string,
    );
    const actualGroupNumber = getGroupNumber(
      userID,
      foodEvent.id,
      foodEvent.groups,
    );

    if (expectedGroupNumber === actualGroupNumber) {
      return {
        body: {
          canEat: true,
          description: "valid code & correct timeslot",
        },
        statusCode: 200,
        headers: header,
      };
    } else {
      const actualTimeSlot = getUserTimeSlot(
        userID,
        foodEvent.id,
        foodEvent.groups,
        foodEvent.start as string,
        foodEvent.end as string,
      );
      return {
        body: {
          canEat: true,
          description: `Person should be in timeslot ${actualTimeSlot}`,
        },
        statusCode: 200,
        headers: header,
      };
    }
  }
};
