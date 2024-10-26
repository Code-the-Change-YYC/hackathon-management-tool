import { fetchContent } from "@/app/actions";
import type { HackathonDetails } from "@/app/contentfulTypes";

import SubmissionDueClock from "./SubmissionDueClock";

export default async function SubmissionDue() {
  const hackathonDetails = (
    (await fetchContent("hackathonDetails")) as unknown as HackathonDetails[]
  )[0];
  // submisssionTime is the eventDate + 24 hours
  const eventDate = new Date(hackathonDetails.fields.eventDate);
  const submissionTime = new Date(
    eventDate.setTime(eventDate.getTime() + 24 * 60 * 60 * 1000),
  );

  return <SubmissionDueClock submissionTime={submissionTime} />;
}
