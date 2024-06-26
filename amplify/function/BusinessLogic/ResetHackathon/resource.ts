import { defineFunction } from "@aws-amplify/backend";

export const ResetHackathon = defineFunction({
  name: "ResetHackathon",
  runtime: 20,
  entry: "./handler.ts",
});
