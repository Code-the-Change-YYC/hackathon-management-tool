import { defineFunction } from "@aws-amplify/backend";

export const getFoodTicket = defineFunction({
  entry: "./handler.ts", // optional path to the function code. Defaults to ./handler.ts
});
