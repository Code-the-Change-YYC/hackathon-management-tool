import { defineFunction } from "@aws-amplify/backend";

export const verifyFoodTicket = defineFunction({
  name: "verifyFoodTicket", // optional parameter to specify a function name.
  entry: "./handler.ts", // optional path to the function code. Defaults to ./handler.ts
});
