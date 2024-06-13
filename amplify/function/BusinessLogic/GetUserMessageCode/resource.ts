import { defineFunction, secret } from "@aws-amplify/backend";

export const GetUserMessageCode = defineFunction({
  entry: "./handler.ts",
  name: "GetUserCode",
  runtime: 20,
  environment: {
    USER_VERIFICATION_KEY: secret("USER_VERIFICATION_KEY"), //secret key for hash
  },
});
