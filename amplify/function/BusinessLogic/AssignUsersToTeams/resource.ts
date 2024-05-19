import { defineFunction } from "@aws-amplify/backend";

export const AssignUsersToTeams = defineFunction({
  entry: "./handler.ts",
  runtime: 20,
  name: "AssignUsersToTeams",
});
