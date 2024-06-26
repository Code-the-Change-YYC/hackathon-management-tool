// Hackathon.ts
import client from "@/components/_Amplify/AmplifyBackendClient";

import { withDatabaseOperations } from "./dbUtils";

export async function seedHackathon() {
  return await withDatabaseOperations(
    [
      () => {
        return client.models.Hackathon.create({
          startDate: "2024-05-02",
          endDate: "2024-05-04",
          scoringComponents: [],
          scoringSidepots: [],
        });
      },
    ],
    "Seed Hackthon",
  );
}
