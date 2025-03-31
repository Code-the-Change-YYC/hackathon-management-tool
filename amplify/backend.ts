// import * as secrets from "aws-cdk-lib/aws-secretsmanager";
import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";
import { defineBackend } from "@aws-amplify/backend";

import { storage } from "./storage/resource";

const backend = defineBackend({
  auth,
  data,
  storage,
});

// Cognito Email Overrides
backend.auth.resources.cfnResources.cfnUserPool.emailConfiguration = {
  emailSendingAccount: "DEVELOPER",
  from: "welcome@hackthechangeyyc.ca",
  sourceArn:
    "arn:aws:ses:ca-central-1:847668204885:identity/hackthechangeyyc.ca",
};

backend.addOutput({
  storage: {
    aws_region: "ca-central-1",
    bucket_name:
      "amplify-dvv7xnx31hgrk-hmt-amplifydataamplifycodege-o8ge4guj5s8m",
  },
});
