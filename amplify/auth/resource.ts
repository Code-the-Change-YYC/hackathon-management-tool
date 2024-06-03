import { PreSignUp } from "@/amplify/auth/PreSignUp/resource";
import { defineAuth } from "@aws-amplify/backend";

import { PostConfirmation } from "./PostConfirmation/resource";

/**
 * Define and configure your auth resource
 * When used alongside data, it is automatically configured as an auth provider for data
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

export const auth = defineAuth({
  groups: ["Admin", "Participant", "Judge"],
  triggers: {
    preSignUp: PreSignUp,
    postConfirmation: PostConfirmation,
  },
  access: (allow) => [allow.resource(PostConfirmation).to(["addUserToGroup"])],
  loginWith: {
    email: true,

    // externalProviders: {
    //   google: {
    //     clientId: secret("GOOGLE_CLIENT_ID"),
    //     clientSecret: secret("GOOGLE_CLIENT_SECRET"),
    //   },
    //   signInWithApple: {
    //     clientId: secret("APPLE_CLIENT_ID"),
    //     teamId: secret("APPLE_TEAM_ID"),
    //     keyId: secret("APPLE_KEY_ID"),
    //     privateKey: secret("APPLE_PRIVATE_KEY"),
    //     scopes: ["name", "email"],
    //   },
    //   callbackUrls: [
    //     "http://localhost:3000",
    //     "https://hackthechangeyyc.ca",
    //     "https://staging.hackthechangeyyc.ca",
    //   ],
    //   logoutUrls: [
    //     "http://localhost:3000/logout",
    //     "https://hackthechangeyyc.ca/logout",
    //     "https://staging.hackthechangeyyc.ca/logout",
    //   ],
    // },
    // add social providers
    // externalProviders: {
    /**
     * first, create your secrets using `amplify sandbox secret`
     * then, import `secret` from `@aws-amplify/backend`
     * @see https://docs.amplify.aws/gen2/deploy-and-host/sandbox-environments/features/#setting-secrets
     */
    // loginWithAmazon: {
    //   clientId: secret('LOGINWITHAMAZON_CLIENT_ID'),
    //   clientSecret: secret('LOGINWITHAMAZON_CLIENT_SECRET'),
    // }
    // configure callback and logout URLs
    // callbackUrls: ['http://localhost:3000'],
    // logoutUrls: ['http://localhost:3000'],
    // },
  },
  /**
   * enable multifactor authentication
   * @see https://docs.amplify.aws/gen2/build-a-backend/auth/manage-mfa
   */
  // multifactor: {
  //   mode: 'OPTIONAL',
  //   sms: {
  //     smsMessage: (code) => `Your verification code is ${code}`,
  //   },
  // },
  userAttributes: {
    /** request additional attributes for your app's users */
    // profilePicture: {
    //   mutable: true,
    //   required: false,
    // },
  },
});
