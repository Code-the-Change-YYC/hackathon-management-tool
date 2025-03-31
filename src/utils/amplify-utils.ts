import { fetchAuthSession } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

import { type Schema } from "@/amplify/data/resource";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";

// eslint-disable-next-line no-restricted-imports
import config from "../../amplify_outputs.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  config,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

export type ClientType<T> = {
  [K in keyof T]: T[K] extends Function
    ? never
    : T[K] extends object
      ? ClientType<T[K]>
      : T[K];
};

/**
 * Required to serialize data from server components to client components
 *
 * Recursively remove functions from an object
 */
export function clientMod<T extends Record<string, any> | any[]>(
  obj: T,
): ClientType<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => clientMod(item)) as ClientType<T>;
  }
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value !== "function") {
      result[key] =
        value && typeof value === "object" ? clientMod(value) : value;
    }
  }
  return result as ClientType<T>;
}
