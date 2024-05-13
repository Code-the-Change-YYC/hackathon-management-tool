import * as secrets from "aws-cdk-lib/aws-secretsmanager";

import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";
import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({
  auth,
  data,
});

backend.auth.resources.cfnResources.cfnUserPool.schema = [
  {
    name: "institution",
    attributeDataType: "String",
    mutable: true,
    required: false,
  },
  // TODO: Apparently required custom attributes are not supported currently. (CloudFormation Error)
  // TODO: BTW, you can't delete custom attributes once they are deleted unless you nuke ur sandbox. I changed testUsername to Allergies
  {
    name: "testUsername",
    attributeDataType: "String",
    mutable: true,
    required: false,
  },
];

const GOOGLE_CLIENT_ID = new secrets.Secret(
  backend.auth.resources.userPool.stack,
  "GOOGLE_CLIENT_ID",
);

const GOOGLE_CLIENT_SECRET = new secrets.Secret(
  backend.auth.resources.userPool.stack,
  "GOOGLE_CLIENT_SECRET",
);

const APPLE_CLIENT_ID = new secrets.Secret(
  backend.auth.resources.userPool.stack,
  "APPLE_CLIENT_ID",
);

const APPLE_TEAM_ID = new secrets.Secret(
  backend.auth.resources.userPool.stack,
  "APPLE_TEAM_ID",
);

const APPLE_KEY_ID = new secrets.Secret(
  backend.auth.resources.userPool.stack,
  "APPLE_KEY_ID",
);

const APPLE_PRIVATE_KEY = new secrets.Secret(
  backend.auth.resources.userPool.stack,
  "APPLE_PRIVATE_KEY",
);
