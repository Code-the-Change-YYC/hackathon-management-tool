import { auth } from "@/auth/resource";
import { data } from "@/data/resource";
import { defineBackend } from "@aws-amplify/backend";

defineBackend({
  auth,
  data,
});
