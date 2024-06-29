// FoodEvent.ts
import client from "@/components/_Amplify/AmplifyBackendClient";

import { withDatabaseOperations } from "./dbUtils";

export async function seedFoodEvents() {
  return await withDatabaseOperations(
    [
      () => {
        console.log("Food Event 1");

        return client.models.FoodEvent.create({
          name: "Eat It",
          description: "Don't wanna argue, I don't wanna debate",
          start: "2025-07-20T17:30:15+05:30",
          end: "2025-08-20T17:30:15+05:30",
          totalGroupCount: 3,
        });
      },
      () => {
        console.log("Food Event 2");

        return client.models.FoodEvent.create({
          name: "The White Album",
          description: "Glass Onions",
          start: "2016-07-20T17:30:15+05:30",
          end: "2016-08-20T17:30:15+05:30",
          totalGroupCount: 2,
        });
      },
    ],
    "Seed Food Events",
  );
}
