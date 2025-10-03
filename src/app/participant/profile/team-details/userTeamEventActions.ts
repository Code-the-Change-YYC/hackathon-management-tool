"use server";

import client from "@/components/_Amplify/AmplifyBackendClient";

export async function leaveTeam(userId: string) {
  const { errors } = await client.models.User.update({
    id: userId,
    teamId: null,
  });

  if (errors) {
    throw new Error(errors[0].message);
  }
}
