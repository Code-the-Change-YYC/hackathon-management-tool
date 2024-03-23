import type { AppSyncResolverHandler } from "aws-lambda";

import client from "@/components/_Amplify/AmplifyBackendClient";

// types imported from @types/aws-lambda

const MAX_TEAM_MEMBERS = 6

type ResolverArgs = { userId: number; teamId: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, context) => {
  console.log("Context: ", context);

  const team = await client.models.Team.get({ id: event.arguments.teamId });

  if (!team) {
    return {
      body: { value: "Error: Team does not exist" },
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
    };
  }

  if(team.data.Members.length > 6) {
    return {
      body: { value: 'Error: Team is full' },
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
    };
  }

  return {
    body: { value: `Echoing content: ${team.data.id}` },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
