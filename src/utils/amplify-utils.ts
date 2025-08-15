import { type SelectionSet } from "aws-amplify/api";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
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

export async function AuthGetAuthSession() {
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

const selectionSet = [
  "id",
  "firstName",
  "lastName",
  "role",
  "email",
  "institution",
  "completedRegistration",
  "allergies",
  "willEatMeals",
  "checkedIn",
  "teamId",
  "profileOwner",
  "JUDGE_roomId",
] as const; // i cant typecast this to schema["User"]["type"] for some reason

export type UserDetailsNoFunctions = SelectionSet<
  Schema["User"]["type"],
  typeof selectionSet
>;

export async function AuthGetCurrentUserDetails() {
  const cookieStore = cookies();
  const all = cookieStore.getAll();
  // amplifygen2 stores cookies named like .idToken, accessToken, etc.
  // might have to change this to a better implemeantion
  const idTokenCookie = all.find((c) => c.name.includes(".idToken"));
  if (!idTokenCookie) {
    return null;
  }
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    if (!currentUser) {
      return null; // because in the route if the user cannot be found we check if !user
    }

    const userId = currentUser?.userId;

    const currentUserDetails = await cookiesClient.models.User.get(
      {
        id: userId,
      },
      {
        selectionSet: selectionSet,
      },
    );

    return currentUserDetails.data;
  } catch (error) {
    console.error(error);
  }
}
