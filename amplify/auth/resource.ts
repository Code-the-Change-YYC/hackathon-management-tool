import { PreSignUp } from "@/amplify/auth/PreSignUp/resource";
import { defineAuth, secret } from "@aws-amplify/backend";

import { AddUserToGroup } from "../function/BusinessLogic/AddUserToGroup/resource";
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
  access: (allow) => [
    allow.resource(PostConfirmation).to(["addUserToGroup"]),
    allow
      .resource(AddUserToGroup)
      .to(["addUserToGroup", "removeUserFromGroup", "listGroupsForUser"]),
  ],
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome Hack the Change!",
      verificationEmailBody: (createCode) =>
        `<h1>Use this code to confirm your Hack the Change Account: ${createCode()}</h1>`,
    },

    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["profile", "email", "openid"],
      },
      // signInWithApple: {
      //   clientId: secret("APPLE_CLIENT_ID"),
      //   teamId: secret("APPLE_TEAM_ID"),
      //   keyId: secret("APPLE_KEY_ID"),
      //   privateKey: secret("APPLE_PRIVATE_KEY"),
      //   scopes: ["name", "email"],
      // },

      callbackUrls: [
        "http://localhost:3000/login",
        "https://hackthechangeyyc.ca/login",
        "https://staging.hackthechangeyyc.ca/login",
      ],
      logoutUrls: [
        "http://localhost:3000/logout",
        "https://hackthechangeyyc.ca/logout",
        "https://staging.hackthechangeyyc.ca/logout",
      ],
    },
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
