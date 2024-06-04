import { defineFunction } from "@aws-amplify/backend";

export const CreateTeamWithCode = defineFunction({
  entry: "./handler.ts",
  runtime: 20,
  name: "CreateTeamWithCode",
});
