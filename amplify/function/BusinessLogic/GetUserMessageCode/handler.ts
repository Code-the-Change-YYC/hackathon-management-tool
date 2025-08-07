import { Amplify } from "aws-amplify";
import type { AppSyncResolverHandler } from "aws-lambda";
import { createAuthenticationCode } from "@/amplify/function/BusinessLogic/utils/crytography";

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

type ResolverArgs = { userMessage: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  const mac = await createAuthenticationCode(
    event.arguments.userMessage,
    process.env.USER_VERIFICATION_KEY || "",
  );

  return {
    body: { value: mac },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
