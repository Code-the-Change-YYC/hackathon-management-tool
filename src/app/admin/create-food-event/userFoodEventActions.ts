"use server";

import client from "@/components/_Amplify/AmplifyBackendClient";

export async function deleteFoodEvent(eventID: string) {
  const toBeDeletedFoodEvent = {
    id: eventID,
  };
  const { errors } = await client.models.FoodEvent.delete(toBeDeletedFoodEvent);

  if (errors) {
    throw new Error(errors[0].message);
  }
}
