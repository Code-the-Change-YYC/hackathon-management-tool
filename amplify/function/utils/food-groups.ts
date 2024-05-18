import { getCalgaryTime } from "./date";

//get a integer value from uuid
export function uuidToInteger(uuid: string) {
  const cleanedUuid = uuid.replace("/-/", "").toUpperCase();

  const first4Chars = cleanedUuid.slice(0, 4);

  // Convert the hexadecimal to int
  const result = parseInt(first4Chars, 16);

  if (isNaN(result)) {
    console.error("The provided UUID is not valid.");
    return -1;
  }

  return result;
}

// Return the start time for the specific group
export function getTimeFromGroupNumber(
  groupNumber: number,
  groups: number | undefined | null,
  startTime: string,
  endTime: string,
): string {
  if (groups === undefined || groups == null) groups = 1;

  const start = getCalgaryTime(startTime);
  const end = getCalgaryTime(endTime);

  //total time between start and end
  const totalDuration = Math.abs(end.getTime() - start.getTime());
  const groupDuration = totalDuration / groups;

  const groupStartTime = getCalgaryTime(
    start.getTime() + groupDuration * groupNumber,
  );
  const groupEndTime = getCalgaryTime(
    start.getTime() + groupDuration * (groupNumber + 1),
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Edmonton",
    hour12: true,
  };

  // Format the date with the specified options
  return (
    groupStartTime.toLocaleString("en-US", options).replace(/,/g, "") +
    " to " +
    groupEndTime.toLocaleString("en-US", options).replace(/,/g, "")
  );
}

export function getGroupNumberFromTime(
  target: Date,
  groups: number | undefined | null,
  startTime: string,
  endTime: string,
): number {
  // Ensure groups is a number and default to 1 if not
  if (groups === undefined || groups == null) groups = 1;
  console.log("pooo");
  console.log(target);
  console.log(groups);
  console.log(startTime);
  console.log(endTime);
  const start = getCalgaryTime(startTime);
  const end = getCalgaryTime(endTime);

  const totalDuration = Math.abs(end.getTime() - start.getTime());
  const groupDuration = totalDuration / groups;
  console.log(totalDuration);
  console.log(groupDuration);
  // If the time is before the start time or after the end time, return an invalid group
  if (target < start || target > end) {
    return -1;
  }

  // Calculate the group number for times within the range
  const timeFromStart = Math.abs(target.getTime() - start.getTime());
  const groupNumber = Math.floor(timeFromStart / groupDuration);

  console.log(timeFromStart);
  console.log("output from getGroupNumberFromTime " + groupNumber);

  return groupNumber;
}

export function getGroupNumber(
  userID: string,
  eventID: string,
  groups: number | undefined | null,
) {
  if (groups === undefined || groups == null) groups = 1;
  console.log("UUID and Integer " + userID + " " + uuidToInteger(userID));
  console.log(
    "output from GetGroupNumber " + Math.abs(uuidToInteger(userID) % groups),
  );
  return Math.abs(uuidToInteger(userID) % groups);
}

export function getUserTimeSlot(
  userID: string,
  eventID: string,
  groups: number | undefined | null,
  startTime: string,
  endTime: string,
) {
  if (groups === undefined || groups == null) groups = 1;

  const userGroupNumber = getGroupNumber(userID, eventID, groups);
  console.log(userGroupNumber);
  console.log(
    getTimeFromGroupNumber(userGroupNumber, groups, startTime, endTime),
  );
  return getTimeFromGroupNumber(userGroupNumber, groups, startTime, endTime);
}
