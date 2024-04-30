import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";
import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({
  auth,
  // data,
});

backend.auth.resources.cfnResources.cfnUserPool.schema = [
  {
    name: "institution",
    attributeDataType: "String",
    mutable: true,
    required: false,
  },
  {
    name: "testUsername",
    attributeDataType: "String",
    mutable: true,
    required: true,
  },
];
