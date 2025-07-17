import { defineFunction } from "@aws-amplify/backend";

export const StopHackathon = defineFunction({
  name: "StopHackathon",
  runtime: 20,
  entry: "./handler.ts",
});
