import { defineFunction } from "@aws-amplify/backend";

export const GenerateTeamCode = defineFunction({
  entry: "./handler.ts",
  runtime: 20,
  name: "GenerateTeamCode",
});
