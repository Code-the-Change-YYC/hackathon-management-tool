"use server";

import client from "@/components/_Amplify/AmplifyBackendClient";

export async function createFoodEvent(formData: FormData) {
  console.log(formData);
  console.log("start: " + formData.get("Start")?.toString());

  const toISO8601String = (dateString: string | undefined) => {
    let setDate = new Date().toISOString();
    if (dateString != undefined) {
      setDate = dateString;
    }
    const date = new Date(setDate);
    return date.toISOString(); // Converts to format YYYY-MM-DDTHH:mm:ss.sssZ
  };

  const { errors, data: FoodEvent } = await client.models.FoodEvent.create({
    Name: formData.get("Name")?.toString() || "Meal",
    Description:
      formData.get("Description")?.toString() || "No Description Provided...",
    Start: toISO8601String(formData.get("Start")?.toString()),
    End: toISO8601String(formData.get("End")?.toString()),
    Groups: parseInt(formData.get("Groups") as string, 10),
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
