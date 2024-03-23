// amplify/data/echo-handler.ts
import client from "@/components/_Amplify/AmplifyBackendClient";
import type { AppSyncResolverHandler } from "aws-lambda";

// types imported from @types/aws-lambda

type ResolverArgs = { userId: number, teamId: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, context) => {
  const team = await client.models.Team.get({id: event.arguments.teamId});
  return {
    body: { value: `Echoing content: ${team}` },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
