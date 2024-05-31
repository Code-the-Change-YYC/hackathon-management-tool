//Functions to help with the creation and verification of a Message Authentication Code
import { kmac128 } from "js-sha3";

/**
 * Determine if the code from the user is valid (not tampered with)
 */
export async function isValidAuthenticationCode(
  message: string,
  mac: string,
  key: string,
): Promise<boolean> {
  const expectedMAC = await createAuthenticationCode(message, key);
  return expectedMAC === mac;
}

/**
 * Creates a MAC code
 */
export async function createAuthenticationCode(
  message: string,
  key: string,
): Promise<string> {
  const messageCode = kmac128(
    key,
    message,
    256,
    "customization, food ticket :)", //this is to customize the hash so that it is more unique
  );
  return messageCode;
}

/**
 * Creates a string with the message and the MAC
 */
export function createMessageAndCode(message: string, mac: string): string {
  return message + ":" + mac;
}

/**
 * get the message and the MAC from a string input
 */
export function getMessageAndCode(input: string): [string, string] {
  const inputArray = input.split(":");
  const message = inputArray[0];
  const mac = inputArray[1];

  return [message, mac];
}
