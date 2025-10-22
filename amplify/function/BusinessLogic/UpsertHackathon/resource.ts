import { defineFunction } from "@aws-amplify/backend";

export const UpsertHackathon = defineFunction({
  name: "UpsertHackathon",
  runtime: 20,
  entry: "./handler.ts",
});
