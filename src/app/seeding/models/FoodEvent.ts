// FoodEvent.ts
import client from "@/components/_Amplify/AmplifyBackendClient";

import { withDatabaseOperations } from "./dbUtils";

export async function seedFoodEvents() {
  return await withDatabaseOperations(
    [
      () => {
        return client.models.FoodEvent.create({
          // ... your event data
        });
      },
    ],
    "FoodEvents", // Use a descriptive name for the operation
  );
}
