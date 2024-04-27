import { eventNames } from "process";
import { start } from "repl";

export function isUserInTimeSlot(
  userID: string,
  eventID: string,
  groups: number,
  startTime: Date,
  endTime: Date,
) {}

function uuidToInteger(uuid: string) {
  const cleanedUuid = uuid.replace(/-/g, "").toUpperCase();

  const first8Chars = cleanedUuid.slice(0, 8);

  // Convert the hexadecimal to int
  const result = parseInt(first8Chars, 16);

  if (isNaN(result)) {
    console.error("The provided UUID is not valid.");
    return 0;
  }

  return result;
}

// Return the start time for the specific group
function getTimeFromGroupNumber(
  groupNumber: number,
  groups: number,
  startTime: string,
  endTime: string,
): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  //total time between start and end
  const totalDuration = Math.abs(end.getTime() - start.getTime());
  const groupDuration = totalDuration / groups;

  const groupStartTime = new Date(
    start.getTime() + groupDuration * groupNumber,
  );
  const groupEndTime = new Date(
    start.getTime() + groupDuration * (groupNumber + 1),
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date with the specified options
  return (
    groupStartTime.toLocaleString("en-US", options).replace(/,/g, "") +
    " to " +
    groupEndTime
      .toLocaleString("en-US", options)
      .replace(/,/g, "")
      .split("at")[1]
  );
}

export function getGroupNumberFromTime(
  target: Date,
  groups: number | undefined | null,
  startTime: string,
  endTime: string,
): number {
  if (!groups) {
    groups = 1;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  const totalDuration = Math.abs(end.getTime() - start.getTime());
  const groupDuration = totalDuration / groups;

  // If the time is before the start time or after the end, return a invalid group
  if (target < start || target > end) {
    return -1;
  }

  // Calculate the group number for times within the range
  const timeFromStart = Math.abs(target.getTime() - start.getTime());
  const groupNumber = Math.floor(timeFromStart / groupDuration);

  return groupNumber;
}

export function getGroupNumber(
  userID: string,
  eventID: string,
  groups: number | undefined | null,
) {
  if (!groups) {
    groups = 1;
  }

  return Math.abs((uuidToInteger(userID) + uuidToInteger(eventID)) % groups);
}

export function getUserTimeSlot(
  userID: string,
  eventID: string,
  groups: number | undefined | null,
  startTime: string,
  endTime: string,
) {
  if (!groups) {
    groups = 1;
  }
  let userGroupNumber = getGroupNumber(userID, eventID, groups);
  return getTimeFromGroupNumber(userGroupNumber, groups, startTime, endTime);
}
