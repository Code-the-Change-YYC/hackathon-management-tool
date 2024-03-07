// amplify/data/custom-authorizer.ts
// This is sample code. Update this to suite your needs
import type { AppSyncAuthorizerHandler } from "aws-lambda";

// types imported from @types/aws-lambda

type ResolverContext = {
  userid: string;
  info: string;
  more_info: string;
};

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (
  event,
) => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Demo delay to simulate asynchronous behavior
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const {
    authorizationToken,
    requestContext: { apiId, accountId },
  } = event;
  console.log(`authorizationToken: ${authorizationToken}`);
  const response = {
    isAuthorized: true,
    resolverContext: {
      userid: "user-id",
      info: "contextual information A",
      more_info: "contextual information B",
    },
    deniedFields: [
      `arn:aws:appsync:${process.env.AWS_REGION}:${accountId}:apis/${apiId}/types/Event/fields/comments`,
      `Mutation.createEvent`,
    ],
    ttlOverride: 300,
  };
  console.log(`RESPONSE: ${JSON.stringify(response, null, 2)}`);
  return response;
};
