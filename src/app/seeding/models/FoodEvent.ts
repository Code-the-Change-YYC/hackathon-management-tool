// FoodEvent.ts
import client from "@/components/_Amplify/AmplifyBackendClient";

import { withDatabaseOperations } from "./dbUtils";

export async function seedFoodEvents() {
  return await withDatabaseOperations(
    [
      () => {
        return client.models.FoodEvent.create({
          name: "test Name",
          description: "test Description",
          start: "2016-07-20T17:30:15+05:30",
          end: "2016-08-20T17:30:15+05:30",
          totalGroupCount: 2,
        });
      },
    ],
    "Seed Food Events",
  );
}
