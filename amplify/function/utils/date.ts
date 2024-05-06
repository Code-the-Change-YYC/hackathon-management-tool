export function getLocalCalgaryTime() {
  const now = new Date();
  const calgaryTimeString = now.toLocaleString("en-US", {
    timeZone: "America/Edmonton",
  });

  const calgaryDateObject = new Date(calgaryTimeString);

  return calgaryDateObject;
}
