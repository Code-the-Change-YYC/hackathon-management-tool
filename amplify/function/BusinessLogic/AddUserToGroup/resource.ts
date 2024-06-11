import { defineFunction } from "@aws-amplify/backend";

export const AddUserToGroup = defineFunction({
  name: "AddUserToGroup",
  runtime: 20,
  entry: "./handler.ts",
});
