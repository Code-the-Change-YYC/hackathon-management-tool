// amplify/data/echo-handler.ts
import type { AppSyncResolverHandler } from "aws-lambda";

// types imported from @types/aws-lambda

type ResolverArgs = { content: string };

type ResolverResult = {
  body: { value: string };
  statusCode: number;
  headers: { "Content-Type": string };
};

export const handler: AppSyncResolverHandler<
  ResolverArgs,
  ResolverResult
> = async (event, context) => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Demo delay to simulate asynchronous behavior
  const start = performance.now();
  console.log("Event: ", event);
  console.log("Context: ", context);
  console.log("Performance: ", performance.now() - start);
  return {
    body: { value: `Echoing content: ${event.arguments.content}` },
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
};
