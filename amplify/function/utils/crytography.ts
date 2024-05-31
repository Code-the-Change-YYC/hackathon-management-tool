import { kmac128 } from "js-sha3";

//Functions to help with the creation and verification of a Message Authentication Code
export async function isValidAuthenticationCode(
  message: string,
  mac: string,
  key: string | undefined,
): Promise<boolean> {
  const expectedMAC = await createAuthenticationCode(message, key);
  return expectedMAC === mac;
}

export async function createAuthenticationCode(
  message: string,
  key: string | undefined,
): Promise<string> {
  if (!key) {
    key = "";
  }
  const messageCode = kmac128(
    key,
    message,
    256,
    "customization, food ticket :)", //this is to customize the hash so that it is more unique
  );
  return messageCode;
}

export function createMessageAndCode(userId: string, mac: string): string {
  return userId + ":" + mac;
}

export function getMessageAndCode(input: string): [string, string] {
  const inputArray = input.split(":");
  const message = inputArray[0];
  const mac = inputArray[1];

  return [message, mac];
}
