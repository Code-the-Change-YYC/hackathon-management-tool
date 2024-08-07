// Functions to help with determining food groups and order

/**
 * get a integer value from uuid
 */
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

/**
 *  Return the start and end calgary time time for a specific group
 */
export function getTimeForFoodGroupPositionNumber(
  groupPositionNumber: number,
  totalGroupCount: number,
  startTime: string,
  endTime: string,
): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  //total time between start and end
  const totalDuration = Math.abs(end.getTime() - start.getTime());
  const groupDuration = totalDuration / totalGroupCount;
  const groupStartTime = new Date(
    start.getTime() + groupDuration * groupPositionNumber,
  );
  const groupEndTime = new Date(
    start.getTime() + groupDuration * (groupPositionNumber + 1),
  );
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    timeZone: process.env.TIME_ZONE,
    hour12: true,
  };

  // Format the date with the specified options
  return (
    groupStartTime.toLocaleString("en-US", options).replace(/,/g, "") +
    " to " +
    groupEndTime.toLocaleString("en-US", options).replace(/,/g, "")
  );
}

/**
 * Get the group number (the order which groups can get food) for a user from time
 * Useful for times when we need to get the current expected group and time slot from the local calgary time
 */
export function getFoodGroupPositionNumberForTime(
  target: Date,
  totalGroupCount: number,
  startTime: string,
  endTime: string,
): number {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const totalDuration = Math.abs(end.getTime() - start.getTime());
  const groupDuration = totalDuration / totalGroupCount;

  // If the time is before the start time or after the end time, return an invalid group
  if (target < start || target > end) {
    return -1;
  }

  // Calculate the group number for times within the range
  const timeFromStart = Math.abs(target.getTime() - start.getTime());
  const groupPositionNumber = Math.floor(timeFromStart / groupDuration);

  return groupPositionNumber;
}

/**
 * gets the group position number (the order which groups can get food) for a user
 */
export function getFoodGroupPositionNumber(
  teamID: string,
  eventID: string,
  totalGroupCount: number,
) {
  // Team UUID is for putting teams into random positions, Event UUID is to ensure that the teams are shuffled each food event.
  // To set the max size of food groups, we can modulus the generated number by the max amount of groups.
  return Math.abs(
    (uuidToInteger(teamID) + uuidToInteger(eventID)) % totalGroupCount,
  );
}
