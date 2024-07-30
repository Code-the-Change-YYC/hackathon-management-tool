import Link from "next/link";

import { Underline } from "@/utils/text-utils";

import PurpleButton from "../PurpleButton";
import CalendarSection from "./CalendarSection";
import CountdownWindow from "./CountdownWindow";
import TeamInformation from "./TeamInformation";

export default function TeamConfirmation({
  teamID,
  state = "Joined",
}: {
  teamID: string;
  state: "Joined" | "Registered";
}) {
  return (
    <>
      <TeamInformation state={state} teamID={teamID} />
      <CountdownWindow>
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
