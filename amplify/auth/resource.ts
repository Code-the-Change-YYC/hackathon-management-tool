import { defineAuth, secret } from "@aws-amplify/backend";
import { AddUserToGroup } from "../function/BusinessLogic/AddUserToGroup/resource";
import { UpsertHackathon } from "../function/BusinessLogic/UpsertHackathon/resource";
import { PostConfirmation } from "./PostConfirmation/resource";

/**
 * Define and configure your auth resource
 * When used alongside data, it is automatically configured as an auth provider for data
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

export const auth = defineAuth({
  groups: ["Admin", "Participant", "Judge"],
  triggers: {
    postConfirmation: PostConfirmation,
  },
  access: (allow) => [
    allow.resource(PostConfirmation).to(["addUserToGroup"]),
    allow
      .resource(AddUserToGroup)
      .to(["addUserToGroup", "removeUserFromGroup", "listGroupsForUser"]),

    allow.resource(UpsertHackathon).to(["deleteUser", "listUsersInGroup"]),
  ],
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome Hack the Change!",
      verificationEmailBody: (createCode) =>
        `<html>
          <head>
              <meta charset="UTF-8" />
              <title>Hack the Change Account Confirmation</title>
              <style>
                  body, html {
                      margin: 0;
                      padding: 0;
                      height: 100%;
                      font-family: Arial, sans-serif;
                  }
                  .email-container {
                      max-width: 600px;
                      margin: 0 auto;
                      /* Need the published Location of the ctc Hero image to paste here according to google */
                      background-size: cover;
                      background-position: center;
                      padding: 40px 20px;
                      box-sizing: border-box;
                      min-height: 400px;
                  }
                  .content-box {
                      background-color: rgba(255, 255, 255, 0.9);
                      border-radius: 8px;
                      padding: 30px;
                      margin: 20px 0;
                      text-align: center;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                      color: #4a4a4a;
                      margin-bottom: 20px;
                  }
                  .verification-code {
                      font-size: 32px;
                      font-weight: bold;
                      color: #ff5a5f;
                      letter-spacing: 2px;
                      padding: 10px;
                      margin: 15px 0;
                  }
                  .footer {
                      font-size: 12px;
                      color: #666;
                      margin-top: 20px;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="content-box">
                      <h1>Hack the Change Account Confirmation</h1>
                      <p>Thank you for creating your Hack the Change account. Please use the code below to complete your registration:</p>
                      <div class="verification-code">${createCode()}</div>
                      <p>If you didn't request this code, you can safely ignore this email.</p>
                  </div>
                  <div class="footer">
                      &copy; 2025 Code the Change. <img src="https://www.codethechangeyyc.ca/_next/image?url=/logo.png&w=96&q=75" alt="Code the Change Logo" style="height: 12px; vertical-align: middle; margin: 0 4px;"> All rights reserved. 
                  </div>
              </div>
          </body>
          </html>`,
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
