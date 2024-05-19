//Function to help with creating dates and timezones with Calgary

export function getLocalCalgaryTime() {
  const now = new Date();
  const calgaryTimeString = now.toLocaleString("en-US", {
    timeZone: "America/Edmonton",
  });

  const calgaryDateObject = new Date(calgaryTimeString);

  return calgaryDateObject;
}

export function getCalgaryTime(time: string | number | Date) {
  const now = new Date(time);
  const calgaryTimeString = now.toLocaleString("en-US", {
    timeZone: "America/Edmonton",
  });

  const calgaryDateObject = new Date(calgaryTimeString);

  return calgaryDateObject;
}
