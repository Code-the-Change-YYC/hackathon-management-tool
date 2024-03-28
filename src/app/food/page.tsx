// app/food/page.tsx
import hmac from "js-crypto-hmac";

import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";

// for npm

export default async function FoodPage() {
  let userVerificationId = null;
  const key = new Uint8Array([
    0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef, 0xea, 0x1f, 0x12, 0x34,
    0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef, 0xea, 0x1f, 0x12, 0x34,
    0x90, 0xab, 0xcd, 0xef, 0xea, 0x1f, 0x12, 0x34,
  ]);
  const hash = "SHA-256";
  async function currentAuthenticatedUser() {
    try {
      const user = await AuthGetCurrentUserServer()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(`The username: ${user?.username}`);
      console.log(`The userId: ${user?.userId}`);

      console.log(await createAuthenticationCode("ab"));
      if (user) {
        userVerificationId = user?.username;
      }
    } catch (err) {
      console.log(err);
    }
  }

  function stringToUint8Array(inputString: string) {
    const encoder = new TextEncoder();
    return encoder.encode(inputString);
  }

  async function createAuthenticationCode(message: string) {
    const msg = stringToUint8Array(message);
    const messageCode = await hmac.compute(key, msg, hash);
    return messageCode;
  }

  await currentAuthenticatedUser();

  return <a>{userVerificationId}</a>;
}
