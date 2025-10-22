import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncIdentityCognito } from "aws-lambda";
import { createTeam, updateUser } from "@/amplify/graphql/mutations";
import { getTeam } from "@/amplify/graphql/queries";
import type { Schema } from "../../../data/resource";

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

export const handler: Schema["CreateTeamWithCode"]["functionHandler"] = async (
  event,
) => {
  let team = null;
  let teamId: string | null = null;
  try {
    do {
      teamId = Array.from(Array(4), () =>
        Math.floor(Math.random() * 36)
          .toString(36)
          .toUpperCase(),
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

    const teamCreation = await client
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
        throw new Error(
          JSON.stringify({
            body: { value: `Error creating team` },
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
          }),
        );
      });

    if (teamCreation) {
      if (event.arguments.addCallerToTeam) {
        return await client
          .graphql({
            query: updateUser,
            variables: {
              input: {
                id: (event.identity as AppSyncIdentityCognito).sub,
                teamId: teamId,
              },
            },
          })
          .then(() => {
            return {
              body: { value: teamId },
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
            };
          })
          .catch(() => {
            throw new Error(
              JSON.stringify({
                body: { value: `Error updating user (team was created)` },
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
              }),
            );
          });
      } else {
        return {
          body: { value: teamId },
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
        };
      }
    } else {
      throw new Error(
        JSON.stringify({
          body: { value: `Error creating team` },
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
        }),
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      JSON.stringify({
        body: { value: `Unhandled Internal Server Error` },
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
};
