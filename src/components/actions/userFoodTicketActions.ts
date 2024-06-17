"use server";

import type { FoodEventCreateFormInputValues } from "@/../ui-components/FoodEventCreateForm";
import client from "@/components/_Amplify/AmplifyBackendClient";

export async function createFoodEvent(fields: FoodEventCreateFormInputValues) {
  const { errors } = await client.models.FoodEvent.create({
    name: fields.name,
    description: fields.description,
    start: fields.start,
    end: fields.end,
    totalGroupCount: fields.totalGroupCount,
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
