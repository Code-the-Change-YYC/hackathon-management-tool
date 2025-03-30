import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncIdentityCognito } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import { tryCatch } from "../utils/try-catch";
import { createTeam, updateUser } from "./graphql/mutations";
import { getTeam } from "./graphql/queries";

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

const generateTeamId = () =>
  Array.from(Array(4), () =>
    Math.floor(Math.random() * 36)
      .toString(36)
      .toUpperCase(),
  ).join("");
const getTeamFromId = (teamId: string) =>
  client.graphql({
    query: getTeam,
    variables: {
      id: teamId,
    },
  });
export const handler: Schema["CreateTeamWithCode"]["functionHandler"] = async (
  event,
) => {
  const {
    arguments: { addCallerToTeam, teamName },
  } = event;

  let teamId = generateTeamId();
  let { error: teamIdTaken } = await tryCatch(getTeamFromId(teamId));
  while (teamIdTaken) {
    teamId = generateTeamId();
    ({ error: teamIdTaken } = await tryCatch(getTeamFromId(teamId)));
  } // possibility of infite loop at 36^4 teams
  const { error: createTeamError } = await tryCatch(
    client.graphql({
      query: createTeam,
      variables: {
        input: {
          name: teamName,
          id: teamId,
        },
      },
    }),
  );
  if (createTeamError) {
    throw new Error(
      JSON.stringify({
        body: { value: `Error creating team` },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
  if (!addCallerToTeam) {
    return {
      body: { value: teamId },
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  }
  const { error: updateUserError, data: updateUserSuccess } = await tryCatch(
    client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: (event.identity as AppSyncIdentityCognito).sub,
          teamId: teamId,
        },
      },
    }),
  );
  if (updateUserSuccess) {
    return {
      body: { value: teamId },
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  }

  throw new Error(
    JSON.stringify({
      body: {
        value: `Error updating user ( ${(event.identity as AppSyncIdentityCognito).sub}) (team was created) ${updateUserError}`,
      },
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    }),
  );
};
