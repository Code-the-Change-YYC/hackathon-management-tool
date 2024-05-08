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
  // let team;
  // try {
  //   team = await dataClient.models.Team.get({ id: event.arguments.teamId });
  // } catch (err) {
  //   return {
  //     body: { value: "Error: Team does not exist" },
  //     statusCode: 404,
  //     headers: { "Content-Type": "application/json" },
  //   };
  // }

  const user = await dataClient.models.User.get({ id: event.arguments.userId });
  console.log(user);
  console.log(event.arguments.teamId);
  console.log("before error");
  const team = await dataClient.models.Team.get({ id: event.arguments.teamId }); // i think this is where the error is occurring
  console.log("after error");
  console.log(team);
  const teamId = team.data?.id;

  if (teamId == null) {
    return {
      body: { value: "Error: Team does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  const userId = user.data?.id;

  if (userId == null) {
    return {
      body: { value: "Error: User does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  if (await user.data?.team()) {
    return {
      body: { value: "Error: User is already part of a team" },
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
    };
  }

  // Please look into this error and how to access nested data using this page:
  // https://docs.amplify.aws/react/build-a-backend/data/data-modeling/relationships/
  // SPECIFICALLY: "Eagerly Load "has Many" Relationships" and "Lazy Load "has Many" Relationships"
  // @ts-ignore
  const { data: members } = await team.data?.members();

  if (members.length >= MAX_TEAM_MEMBERS) {
    return {
      body: { value: "Error: Team is full" },
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
    };
  }

  const result = await dataClient.models.User.update({
    id: userId,
    teamId: teamId,
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
};
