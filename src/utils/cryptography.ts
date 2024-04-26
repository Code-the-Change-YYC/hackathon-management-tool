import { kmac128 } from "js-sha3";

//TODO: replace with actual key in future
const key = "key"

export async function createAuthenticationCode(
  message: string,
): Promise<string> {

  const messageCode = kmac128(key, message, 256, 'customization, food ticket :)');  ;
  return messageCode;
}


export async function isValidAuthenticationCode(
  message: string,
  mac: string,
): Promise<boolean> {

  const expectedMAC = await createAuthenticationCode(message);
  const isValid = expectedMAC == mac
  return isValid;
}

export function createUserIDAndCode(userId: string, mac: string): string {
  return userId + ":" + mac;
}

export function getUserIDAndCode(input: string): [string, string] {
  const inputArray = input.split(":");
  const userID = inputArray[0];
  const mac = inputArray[1];

  return [userID, mac];
}
