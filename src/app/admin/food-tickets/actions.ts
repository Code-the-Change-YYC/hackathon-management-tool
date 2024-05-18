"use server";

import type { FoodEventCreateFormInputValues } from "@/../ui-components/FoodEventCreateForm";
import client from "@/components/_Amplify/AmplifyBackendClient";

export async function createFoodEvent(fields: FoodEventCreateFormInputValues) {
  const { errors } = await client.models.FoodEvent.create({
    name: fields.name || "Meal",
    description: fields.description || "No Description Provided...",
    start: fields.start,
    end: fields.end,
    groups: fields.groups || 1,
  });

  if (errors) {
    console.log(errors);
  }
}

export async function deleteFoodEvent(eventID: string) {
  const toBeDeletedFoodEvent = {
    id: eventID,
  };
  const { errors } = await client.models.FoodEvent.delete(toBeDeletedFoodEvent);

  if (errors) {
    console.log(errors);
  }
}
