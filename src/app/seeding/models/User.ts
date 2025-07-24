// FoodEvent.ts
import client from "@/components/_Amplify/AmplifyBackendClient";
import { withDatabaseOperations } from "./dbUtils";

export async function seedJudges() {
  return await withDatabaseOperations(
    [
      () => {
        console.log("Judge 1");
        return client.models.User.create({
          id: "1",
          firstName: "John",
          lastName: "Doe",
          role: "Judge",
        });
      },
      () => {
        console.log("Judge 2");

        return client.models.User.create({
          id: "2",
          firstName: "Jane",
          lastName: "Doe",
          role: "Judge",
        });
      },
      () => {
        console.log("Judge 3");

        return client.models.User.create({
          id: "3",
          firstName: "John",
          lastName: "Smith",
          role: "Judge",
        });
      },
      () => {
        console.log("Judge 4");

        return client.models.User.create({
          id: "4",
          firstName: "Jane",
          lastName: "Smith",
          role: "Judge",
        });
      },
      () => {
        console.log("Judge 5");

        return client.models.User.create({
          id: "5",
          firstName: "John",
          lastName: "Johnson",
          role: "Judge",
        });
      },
      () => {
        console.log("Judge 6");

        return client.models.User.create({
          id: "6",
          firstName: "Jane",
          lastName: "Johnson",
          role: "Judge",
        });
      },
      () => {
        console.log("Judge 7");

        return client.models.User.create({
          id: "7",
          firstName: "John",
          lastName: "Williams",
          role: "Judge",
        });
      },
    ],
    "Seed Food Events",
  );
}
