// Team.ts
import client from "@/components/_Amplify/AmplifyBackendClient";

import { withDatabaseOperations } from "./dbUtils";

export async function seedScore() {
  return await withDatabaseOperations(
    [
      () => {
        return client.models.Score.create({
          id: "678eea82-81b6-48be-b5a0-3cfd26017857",
          teamId: "5bbd4ec8-05c6-4fc6-9ecf-bbbbed114de4",
          judgeId: "bf6a04ec-a860-4a86-a387-2c5f1447d636",
          score: "{}",
          hackathonId: "f6f579a0-cc3f-4a54-a4e3-3967d3ac90f0",
        });
      },
    ],
    "Seed Scores",
  );
}
