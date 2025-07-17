import { defineFunction } from "@aws-amplify/backend";

export const StartHackathon = defineFunction({
  name: "StartHackathon",
  runtime: 20,
  entry: "./handler.ts",
});
