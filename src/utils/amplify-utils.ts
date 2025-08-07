import { fetchAuthSession } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { type Schema } from "@/amplify/data/resource";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import config from "../../amplify_outputs.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}
