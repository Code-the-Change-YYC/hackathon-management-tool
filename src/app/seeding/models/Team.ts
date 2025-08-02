// Team.ts
import client from "@/components/_Amplify/AmplifyBackendClient";
import { withDatabaseOperations } from "./dbUtils";

export async function seedTeams() {
  return await withDatabaseOperations(
    [
      () => {
        console.log("Team 1");

        return client.models.Team.create({
          id: "1",
          name: "Team 1",
          approved: true,
        });
      },
      () => {
        console.log("Team 2");

        return client.models.Team.create({
          id: "2",
          name: "Team 2",
          approved: true,
        });
      },
      () => {
        console.log("Team 3");

        return client.models.Team.create({
          id: "3",
          name: "Team 3",
          approved: true,
        });
      },
      () => {
        console.log("Team 4");

        return client.models.Team.create({
          id: "4",
          name: "Team 4",
          approved: true,
        });
      },
      () => {
        console.log("Team 5");

        return client.models.Team.create({
          id: "5",
          name: "Team 5",
          approved: true,
        });
      },
      () => {
        console.log("Team 6");

        return client.models.Team.create({
          id: "6",
          name: "Team 6",
          approved: true,
        });
      },
      () => {
        console.log("Team 7");

        return client.models.Team.create({
          id: "7",
          name: "Team 7",
          approved: true,
        });
      },
      () => {
        console.log("Team 8");

        return client.models.Team.create({
          id: "8",
          name: "Team 8",
          approved: true,
        });
      },
      () => {
        console.log("Team 9");

        return client.models.Team.create({
          id: "9",
          name: "Team 9",
          approved: true,
        });
      },
      () => {
        console.log("Team 10");

        return client.models.Team.create({
          id: "10",
          name: "Team 10",
          approved: true,
        });
      },
    ],
    "Seed Food Events",
  );
}
