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
