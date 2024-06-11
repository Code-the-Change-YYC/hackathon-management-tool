// amplify/functions/my-demo-function/resource.ts
import { defineFunction } from "@aws-amplify/backend";

export const PostConfirmation = defineFunction({
  name: "PostConfirmation", // optional parameter to specify a function name.
  entry: "./handler.ts", // optional path to the function code. Defaults to ./handler.ts
  runtime: 20,
});
