import { Amplify } from "aws-amplify";
import type { AppSyncResolverHandler } from "aws-lambda";

import {
  getUserIDAndCode,
  isValidAuthenticationCode,
} from "../utils/crytography";

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

type ResolverArgs = {
  userCode: string;
};

type ResolverResult = {
  statusCode: number;
  headers: { "Content-Type": string };
};

const header = { "Content-Type": "application/json" };

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  const [userID, mac] = getUserIDAndCode(event.arguments.userCode);

  //Make sure their code is a valid one that has not been tampered with
  const isValidCode = await isValidAuthenticationCode(
    userID,
    mac,
    process.env.USER_VERIFICATION_KEY,
  );

  return {
    statusCode: isValidCode ? 200 : 422,
    headers: header,
  };
};
