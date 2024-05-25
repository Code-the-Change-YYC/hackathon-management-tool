import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";

import type { Schema } from "../../../data/resource";
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

type ResolverArgs = Record<string, never>;

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (_) => {
  let team = null;
  let id = null;
  try {
    do {
      id = Array.from(Array(4), () =>
        Math.floor(Math.random() * 36).toString(36),
      ).join("");

      team = (
        await client.graphql({
          query: getTeam,
          variables: {
            id: id,
          },
        })
      ).data.getTeam;
    } while (team != null);

    return {
      body: { value: id },
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
