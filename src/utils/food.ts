import { start } from "repl";

export function isUserInTimeSlot(
  userID: string, 
  eventID: string, 
  groups: number, 
  startTime: Date,
  endTime: Date,
  )
{

}

function uuidToInteger(uuid : string) {
  const cleanedUuid = uuid.replace(/-/g, '').toUpperCase();

  const first8Chars = cleanedUuid.slice(0, 8);

  // Convert the hexadecimal to int 
  const result = parseInt(first8Chars, 16);

  if (isNaN(result)) {
    console.error('The provided UUID is not valid.');
    return 0;
}

  return result;
}

// Return the start time for the specific group
function getTimeFromGroupNumber(
  groupNumber: number, 
  groups: number,
  startTime: string,
  endTime: string
)
{
  //finish this
}

export function getUserTimeSlot(
  userID: string, 
  eventID: string, 
  groups: number | undefined | null, 
  startTime: string,
  endTime: string
) 
{
  if (!groups)
  {
    groups = 1 
  }
  let userGroupNumber = uuidToInteger(userID) + uuidToInteger(eventID) % groups
  return getTimeFromGroupNumber(userGroupNumber, groups, startTime, endTime);  
}