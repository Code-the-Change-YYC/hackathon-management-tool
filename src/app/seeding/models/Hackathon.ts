// Hackathon.ts
import client from "@/components/_Amplify/AmplifyBackendClient";

import { withDatabaseOperations } from "./dbUtils";

export async function seedHackathon() {
  return await withDatabaseOperations(
    [
      () => {
        // Sample data for scoringComponents and scoringSidepots
        const sampleScoringComponents = [
          {
            id: "component1",
            friendlyName: "Code Quality",
            isSidepot: false,
          },
          {
            id: "component2",
            friendlyName: "Design",
            isSidepot: false,
          },
        ];

        const sampleScoringSidepots = [
          {
            id: "sidepot1",
            friendlyName: "Best UI/UX",
            isSidepot: true,
          },
          {
            id: "sidepot2",
            friendlyName: "Most Innovative",
            isSidepot: true,
          },
        ];

        return client.models.Hackathon.create({
          id: "f6f579a0-cc3f-4a54-a4e3-3967d3ac90f0",
          startDate: "2024-05-02",
          endDate: "2024-05-04",
          scoringComponents: sampleScoringComponents,
          scoringSidepots: sampleScoringSidepots,
        });
      },
    ],
    "Seed Hackathon",
  );
}
