import { Amplify } from "aws-amplify";
import type { AppSyncResolverHandler } from "aws-lambda";

import { createAuthenticationCode } from "../utils/crytography";
import { modelIntrospection } from "./amplifyconfiguration.json";

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

type ResolverArgs = { userId: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  const userID = event.arguments.userId;

  const mac = await createAuthenticationCode(userID);

  return {
    body: { value: mac },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
