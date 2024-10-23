import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import { data } from "../_amplify_model/amplify_outputs.json";
import { updateUser } from "./graphql/mutations";

const MAX_TEAM_MEMBERS = 6;
Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT as string,
        region: process.env.AWS_REGION,
        defaultAuthMode: "iam",
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
  const user = (
    await client.models.User.get({
      id: event.arguments.userId,
    })
  ).data;
  const team = (
    await client.models.Team.get({
      id: event.arguments.teamId,
    })
  ).data;
  if (team == null) {
    throw new Error(
      JSON.stringify({
        body: { value: "Error: Team does not exist" },
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  if (user == null) {
    throw new Error(
      JSON.stringify({
        body: { value: "Error: User does not exist" },
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  if ((await user.team()).data) {
    throw new Error(
      JSON.stringify({
        body: { value: "Error: User is already part of a team" },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
  const members = (await team.members()).data;

  if (members.length >= MAX_TEAM_MEMBERS) {
    throw new Error(
      JSON.stringify({
        body: { value: "Error: Team is full" },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );
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
    console.error(result.errors);
    throw new Error(
      JSON.stringify({
        body: { value: `Error while updating database` },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
};
