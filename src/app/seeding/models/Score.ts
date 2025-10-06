// Team.ts
import client from "@/components/_Amplify/AmplifyBackendClient";
import { withDatabaseOperations } from "./dbUtils";

export async function seedScore() {
  return await withDatabaseOperations(
    [
      () => {
        return client.models.Score.create({
          id: "1",
          teamId: "1",
          judgeId: "1",
          score: "{}",
        });
      },
    ],
    "Seed Scores",
  );
}
