import Link from "next/link";

import PurpleButton from "@/components/PurpleButton";
import CalendarSection from "@/components/teamRegistration/CalendarSection";
import TeamInformation from "@/components/teamRegistration/TeamInformation";
import { Underline } from "@/utils/text-utils";

import CountdownWindow from "./CountdownWindow";

export default function page({ params }: { params: { teamID: string } }) {
  return (
    <>
      <TeamInformation teamID={params.teamID} />
      <CountdownWindow>
        <h1 className="text-2xl font-semibold">
          <Underline noTick>Add to Calendar</Underline>
        </h1>
        <hr />
        <CalendarSection />
      </CountdownWindow>

      <div className="my-4 flex w-full justify-end text-white">
        <Link href="/participant/profile">
          <PurpleButton>Return</PurpleButton>
        </Link>
      </div>
    </>
  );
}
