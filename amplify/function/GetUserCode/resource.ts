import { defineFunction, secret } from "@aws-amplify/backend";

export const GetUserCode = defineFunction({
  environment: {
    USER_VERIFICATION_KEY: secret("USER_VERIFICATION_KEY"),
  },
});
