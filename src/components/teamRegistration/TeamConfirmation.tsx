import Link from "next/link";

import { fetchContent } from "@/app/actions";
import type { HackathonDetails } from "@/app/contentfulTypes";
import { Underline } from "@/utils/text-utils";

import PurpleButton from "../PurpleButton";
import CalendarSection from "./CalendarSection";
import CountdownWindow from "./CountdownWindow";
import TeamInformation from "./TeamInformation";

export default async function TeamConfirmation({
  teamID,
  state = "Joined",
}: {
  teamID: string;
  state: "Joined" | "Registered";
}) {
  const hackathonDetails = (
    (await fetchContent("hackathonDetails")) as unknown as HackathonDetails[]
  )[0];
  const hackathonInformation = {
    eventName: hackathonDetails.fields.eventName,
    eventDate: new Date(hackathonDetails.fields.eventDate),
  };
  return (
    <>
      <TeamInformation state={state} teamID={teamID} />
      <CountdownWindow hackathonInformation={hackathonInformation}>
        <h1 className="text-2xl font-semibold">
          <Underline noTick>Add to Calendar</Underline>
        </h1>
        <hr />
        <CalendarSection />
      </CountdownWindow>

      <div className="my-4 flex w-full justify-center text-white sm:justify-end">
        <Link href="/participant/profile">
          <PurpleButton className="w-48">Return</PurpleButton>
        </Link>
      </div>
    </>
  );
}
