export function generateICS(event: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}): string {
  const { title, description, location, startDate, endDate } = event;

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  const formatDescription = (desc: string) => {
    return desc.replace(/\n/g, "\\n").replace(/(.{72})/g, "$1\n ");
  };
  const customDescription = formatDescription(description);
  return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CodeTheChangeYYC//HackTheChange//EN
BEGIN:VEVENT
UID:${new Date().toISOString()}@yourdomain.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${customDescription}
LOCATION:${location}
END:VEVENT
END:VCALENDAR
`.trim();
}
// utils/downloadICS.ts
export function downloadICS(icsContent: string, filename: string): void {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface EventDetails {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}
export const event: EventDetails = {
  title: "Hack the Change 2025",
  description: `
Join us for an exciting hackathon event! This is a great opportunity to showcase your skills, network with other tech enthusiasts, and compete for amazing cash prizes. Here's what you can expect:

- Delicious food and beverages provided throughout the event.
- Ample networking opportunities with industry professionals and fellow participants.
- Exciting cash prizes for the top teams and standout performers.
- General details about the event, including schedules, rules, and judging criteria.

Don't miss out on this chance to innovate, collaborate, and win big!
  `.trim(),
  location: "ENG 24, University of Calgary",
  startDate: new Date("2024-11-09T16:00:00Z"), //Saturday, November 9, 2024 9:00:00 AM MST
  endDate: new Date("2024-11-11T01:00:00Z"), //Sunday, November 11, 2024 6:00:00 PM MST
};
export const downloadEvent = () => {
  const icsContent = generateICS(event);
  downloadICS(icsContent, event.title);
};
