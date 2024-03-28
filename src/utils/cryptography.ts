import hmac from "js-crypto-hmac";

const key = new Uint8Array([
  0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef, 0xea, 0x1f, 0x12, 0x34, 0x12,
  0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef, 0xea, 0x1f, 0x12, 0x34, 0x90, 0xab,
  0xcd, 0xef, 0xea, 0x1f, 0x12, 0x34,
]);
const hash = "SHA-256";

function hexToUint8Array(inputString: string): Uint8Array {
  const rawOutput = [];
  const hexArray = inputString.split(";");
  for (let i = 0; i < hexArray.length - 1; i++) {
    rawOutput.push(parseInt(hexArray[i], 16));
  }
  return new Uint8Array(rawOutput);
}

function uint8ArrayToHex(inputArray: Uint8Array): string {
  let output = "";
  inputArray.forEach((value) => (output += value.toString(16) + ";"));
  return output;
}

export async function createAuthenticationCode(
  message: string,
): Promise<Uint8Array> {
  const msg = hexToUint8Array(message);
  const messageCode = await hmac.compute(key, msg, hash);
  return messageCode;
}

export async function isValidAuthenticationCode(
  message: string,
  mac: Uint8Array,
): Promise<boolean> {
  const msg = hexToUint8Array(message);
  const valid = await hmac.verify(key, msg, mac, hash);
  return valid;
}

export function createUserIDAndCode(userId: string, mac: Uint8Array): string {
  const userMAC = uint8ArrayToHex(mac);
  return userId + ":" + userMAC;
}

export function getUserIDAndCode(input: string): [string, Uint8Array] {
  const inputArray = input.split(":");
  const userID = inputArray[0];
  const stringMAC = inputArray[1];
  const mac = hexToUint8Array(stringMAC);
  return [userID, mac];
}
