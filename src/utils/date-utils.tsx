export const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const calculateDateDifference = (
  targetDate: Date,
  referenceDate = new Date(),
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const difference = targetDate.getTime() - referenceDate.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};
export const hackathonTimeRemaining = (
  hackathonFinishTime: Date,
  referenceDate = new Date(),
): {
  hours: number;
  minutes: number;
} => {
  const difference = hackathonFinishTime.getTime() - referenceDate.getTime();
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
};
