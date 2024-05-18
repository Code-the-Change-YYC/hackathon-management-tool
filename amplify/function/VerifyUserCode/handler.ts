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
  uuidToInteger,
} from "../utils/food-groups";
import type { ModelUserConnection, User } from "./graphql/API";
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

type ResolverArgs = {
  userCode: string;
  eventID: string;
};

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

  const attended = foodEvent.attended as ModelUserConnection;
  const hasUserInEvent = attended.items.some(
    (item: User | null) => item !== null && item.id === userID,
  );
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
  const isValidCode = await isValidAuthenticationCode(
    userID,
    mac,
    process.env.USER_VERIFICATION_KEY,
  );

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
    const currentGroupNumber = getGroupNumberFromTime(
      getLocalCalgaryTime(),
      foodEvent.groups,
      foodEvent.start || "",
      foodEvent.end || "",
    );

    const userGroupNumber = getGroupNumber(
      userID,
      foodEvent.id,
      foodEvent.groups,
    );
    console.log("current group from time" + currentGroupNumber);
    console.log("User number" + userGroupNumber);
    if (currentGroupNumber === userGroupNumber) {
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
        foodEvent.start || "",
        foodEvent.end || "",
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
