"use server";

import type { Schema } from "@/amplify/data/resource";
import client from "@/components/_Amplify/AmplifyBackendClient";

export async function createFoodEvent(fields: Schema["FoodEvent"]["type"]) {
  const { errors } = await client.models.FoodEvent.create({
    name: fields.name ? fields.name : "",
    description: fields.description ? fields.description : "",
    start: fields.start ? fields.start : "",
    end: fields.end ? fields.end : "",
    totalGroupCount: fields.totalGroupCount ? fields.totalGroupCount : 1,
  });

  if (errors) {
    throw new Error(errors[0].message);
  }
}

export async function deleteFoodEvent(eventID: string) {
  const toBeDeletedFoodEvent = {
    id: eventID,
  };
  const { errors } = await client.models.FoodEvent.delete(toBeDeletedFoodEvent);

  if (errors) {
    throw new Error(errors[0].message);
  }
}
