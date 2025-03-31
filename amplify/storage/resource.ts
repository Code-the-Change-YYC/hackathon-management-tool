import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "profileImageStorage",
  access: (allow) => ({
    "profile-pictures/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "picture-submissions/*": [
      allow.authenticated.to(["read", "write"]),
      allow.guest.to(["read", "write"]),
    ],
    "private/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "media/*": [allow.authenticated.to(["read", "write", "delete"])],
    "media/profile-pictures/*": [allow.guest.to(["read"])],
    "media/albums/*": [allow.authenticated.to(["read"])],
    "other/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
});
