import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "profileImageStorage",
  access: (allow) => ({
    "public/*": [
      allow.authenticated.to(["read", "write", "delete"]),
      allow.groups(["Participant"]).to(["read", "write"]),
      allow.groups(["Judge"]).to(["read", "write", "delete"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
  }),
});
