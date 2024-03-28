import type { AppSyncResolverHandler } from "aws-lambda";

import {
  createAuthenticationCode,
  createUserIDAndCode,
} from "@/utils/cryptography";

type ResolverArgs = { userID: string };

type ResolverResult = {
  body: { userCode: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, _) => {
  const userID = event.arguments.userID;

  const mac = await createAuthenticationCode(userID);
  const userVerificationCode = createUserIDAndCode(userID, mac);

  return {
    body: { userCode: userVerificationCode },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
