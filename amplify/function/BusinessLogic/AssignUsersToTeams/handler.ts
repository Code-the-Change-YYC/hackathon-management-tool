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
  let team;
  try {
    team = await dataClient.models.Team.get({ id: event.arguments.teamId });
  } catch (err) {
    return {
      body: { value: "Error: Team does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  const user = await dataClient.models.User.get({ id: event.arguments.userId });

  if (user.data.id == null) {
    return {
      body: { value: "Error: User does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  if (await user.data.Team()) {
    return {
      body: { value: "Error: User is already part of a team" },
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
    };
  }

  await dataClient.models.User.update({
    id: event.arguments.userId,
    TeamId: team.data.id,
  });

  const { data: members } = await team.data.Members();

  if (members.length >= MAX_TEAM_MEMBERS) {
    return {
      body: { value: "Error: Team is full" },
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
    };
  }

  return {
    body: { value: `Success` },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
