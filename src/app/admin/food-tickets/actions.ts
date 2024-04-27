"use server";

import type { FoodEventCreateFormInputValues } from "@/../ui-components/FoodEventCreateForm";
import client from "@/components/_Amplify/AmplifyBackendClient";

export async function createFoodEvent(fields: FoodEventCreateFormInputValues) {
  const { errors, data: newTodo } = await client.models.FoodEvent.create({
    Name: fields.Name || "Meal",
    Description: fields.Description || "No Description Provided...",
    Start: fields.Start,
    End: fields.End,
    Groups: fields.Groups || 1,
  });

  if (errors) {
    console.log(errors);
  }
}

export async function deleteFoodEvent(eventID: string) {
  const toBeDeletedFoodEvent = {
    id: eventID,
  };
  const { data: deletedTodo, errors } =
    await client.models.FoodEvent.delete(toBeDeletedFoodEvent);

  if (errors) {
    console.log(errors);
  }
}
