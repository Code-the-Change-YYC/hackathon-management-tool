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

const createNewTeam = (teamName: string, teamId: string) =>
  client.graphql({
    query: createTeam,
    variables: {
      input: {
        name: teamName,
        id: teamId,
      },
    },
  });
const updateUserTeam = (id: string, teamId: string) =>
  client.graphql({
    query: updateUser,
    variables: {
      input: {
        id,
        teamId,
      },
    },
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
  let attempts = 0;
  const MAX_ATTEMPTS = 100; // Define a maximum number of attempts

  while (teamIdTaken && attempts < MAX_ATTEMPTS) {
    teamId = generateTeamId();
    ({ error: teamIdTaken } = await tryCatch(getTeamFromId(teamId)));
    attempts++;
  }

  if (teamIdTaken) {
    // Handle the case where a unique team ID could not be generated
    throw new Error(
      JSON.stringify({
        body: {
          value: `Failed to generate a unique team ID after ${MAX_ATTEMPTS} attempts.`,
        },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
  const { error: createTeamError } = await tryCatch(
    createNewTeam(teamName, teamId),
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
    updateUserTeam((event.identity as AppSyncIdentityCognito).sub, teamId),
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
