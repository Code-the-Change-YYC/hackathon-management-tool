"use server";

// import type { FoodEventCreateFormInputValues } from "@../../../ui-components/FoodEventCreateForm";
import client from "@/components/_Amplify/AmplifyBackendClient";

import type { FormFields } from "./createFoodTicketForm";

export async function createFoodEvent(fields: FormFields) {
  const { errors } = await client.models.FoodEvent.create({
    name: fields.name ? fields.name : "",
    description: fields.description ? fields.description : "",
    start: fields.start ? fields.start : "",
    end: fields.end ? fields.end : "",
    totalGroupCount: fields.totalGroupCount ? fields.totalGroupCount : 1,
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
