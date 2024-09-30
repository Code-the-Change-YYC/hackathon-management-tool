import { defineFunction } from "@aws-amplify/backend";

export const ScheduleTeamsAndJudges = defineFunction({
  entry: "./handler.ts",
  runtime: 20,
  name: "ScheduleTeamsAndJudges",
  timeoutSeconds: 15,
});
