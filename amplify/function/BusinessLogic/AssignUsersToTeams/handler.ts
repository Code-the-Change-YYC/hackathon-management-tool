import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import type { ModelUserConnection } from "./graphql/API";
import { updateUser } from "./graphql/mutations";
import { getTeam, getUser } from "./graphql/queries";

const MAX_TEAM_MEMBERS = 6;
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

type ResolverArgs = { userId: string; teamId: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  try {
    const user = (
      await client.graphql({
        query: getUser,
        variables: {
          id: event.arguments.userId,
        },
      })
    ).data.getUser;
    const team = (
      await client.graphql({
        query: getTeam,
        variables: {
          id: event.arguments.teamId,
        },
      })
    ).data.getTeam;

    console.log(user);
    console.log(team);
    if (team == null) {
      return {
        body: { value: "Error: Team does not exist" },
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
      };
    }

    if (user == null) {
      return {
        body: { value: "Error: User does not exist" },
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
      };
    }

    if (user.team) {
      return {
        body: { value: "Error: User is already part of a team" },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      };
    }
    const members = (team.members as ModelUserConnection).items;

    if (members.length >= MAX_TEAM_MEMBERS) {
      return {
        body: { value: "Error: Team is full" },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      };
    }

    const result = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.id,
          teamId: team.id,
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
    console.error(error);
    return {
      body: { value: (error as Error).message },
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    };
  }
};
