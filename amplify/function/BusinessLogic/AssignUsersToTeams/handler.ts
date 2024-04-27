import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import { modelIntrospection } from "../../amplifyconfiguration.json";

const MAX_TEAM_MEMBERS = 6;
Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.amplifyData_GRAPHQL_ENDPOINT as string, // replace with your defineData name
        region: process.env.AWS_REGION,
        defaultAuthMode: "iam",
        modelIntrospection: modelIntrospection as never,
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        // eslint-disable-next-line @typescript-eslint/require-await
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
> = async (event, context) => {
  console.log("Context: ", context);
  console.log(event);

  const team = await dataClient.models.Team.get({ id: event.arguments.teamId });
  console.log("Got team");
  const user = await dataClient.models.User.get({ id: event.arguments.userId });
  console.log("Got user");

  if (!team) {
    return {
      body: { value: "Error: Team does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  if (!user) {
    return {
      body: { value: "Error: User does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  console.log(user);
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

  if (team.data.Members.length > MAX_TEAM_MEMBERS) {
    return {
      body: { value: "Error: Team is full" },
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
    };
  }

  return {
    body: { value: `Echoing content:` },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
