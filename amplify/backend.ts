// import * as secrets from "aws-cdk-lib/aws-secretsmanager";
import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";
import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({
  auth,
  data,
});

// Cognito Email Overrides
backend.auth.resources.cfnResources.cfnUserPool.emailConfiguration = {
  emailSendingAccount: "DEVELOPER",
  from: "welcome@hackthechangeyyc.ca",
  sourceArn:
    "arn:aws:ses:ca-central-1:847668204885:identity/hackthechangeyyc.ca",
};
