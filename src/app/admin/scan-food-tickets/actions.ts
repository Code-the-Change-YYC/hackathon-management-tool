"use server";

import client from "@/components/_Amplify/AmplifyBackendClient";

export async function verifyFoodTicket(userCode: string, eventID: string) {
  try {
    const response = await client.mutations.verifyUserVerifcationCode({
      userCode: userCode,
      eventID: eventID,
    });
    const response_body = response.data?.body;
    const json = JSON.parse(response_body as string);

    const canEat = json["canEat"];
    const description = json["description"];
    const debugging = json["debugging"];

    return { canEat, description, debugging };
  } catch (error) {
    console.error("Error verifying food ticket:", error);
    return { canEat: false, description: error };
  }
}
