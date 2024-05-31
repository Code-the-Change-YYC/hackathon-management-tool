import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import {
  createTeam,
  updateUser,
} from "../AssignUsersToTeams/graphql/mutations";
import { getTeam, getUser } from "./graphql/queries";

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

type ResolverArgs = { teamName: string; userId: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  let team = null;
  let teamId = null;
  try {
    const user = (
      await client.graphql({
        query: getUser,
        variables: {
          id: event.arguments.userId,
        },
      })
    ).data.getUser;

    if (user == null) {
      return {
        body: { value: `User does not exist` },
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
      };
    }

    do {
      teamId = Array.from(Array(4), () =>
        Math.floor(Math.random() * 36).toString(36),
      ).join("");

      team = (
        await client.graphql({
          query: getTeam,
          variables: {
            id: teamId,
          },
        })
      ).data.getTeam;
    } while (team != null);

    await client
      .graphql({
        query: createTeam,
        variables: {
          input: {
            name: event.arguments.teamName,
            id: teamId,
          },
        },
      })
      .catch(() => {
        return {
          body: { value: `Error creating team` },
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
        };
      });

    await client
      .graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            teamId: teamId,
          },
        },
      })
      .catch(() => {
        return {
          body: { value: `Error updating user` },
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
        };
      });

    return {
      body: { value: teamId },
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  } catch {
    return {
      body: { value: `Unhandled Internal Server Error` },
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    };
  }
};
