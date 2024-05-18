import { defineFunction, secret } from "@aws-amplify/backend";

export const VerifyUserCode = defineFunction({
  environment: {
    USER_VERIFICATION_KEY: secret("USER_VERIFICATION_KEY"),
  },
});
