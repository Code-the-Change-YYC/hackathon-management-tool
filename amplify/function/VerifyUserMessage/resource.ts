import { defineFunction, secret } from "@aws-amplify/backend";

export const VerifyUserMessage = defineFunction({
  entry: "./handler.ts",
  name: "VerifyUserCode",
  runtime: 20,
  environment: {
    USER_VERIFICATION_KEY: secret("USER_VERIFICATION_KEY"),
  },
});
