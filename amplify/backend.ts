import * as secrets from "aws-cdk-lib/aws-secretsmanager";

import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";
import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({
  auth,
  data,
});

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
