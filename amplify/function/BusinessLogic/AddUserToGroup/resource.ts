import { defineFunction } from "@aws-amplify/backend";

export const addUserToGroup = defineFunction({
  name: "AddUserToGroup",
  runtime: 20,
  entry: "./handler.ts",
});
