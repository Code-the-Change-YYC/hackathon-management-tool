import Link from "next/link";
import client from "@/components/_Amplify/AmplifyBackendClient";
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
  // this one doesn't need to be by api key because technically the user should be signed in
  const { data: hackathonData } = await client.models.Hackathon.list({
    selectionSet: ["id", "startDate", "endDate"],
  });

  // super scuffed please seed every sandbox with a hackathon first prolly
  if (hackathonData && hackathonData.length === 0) {
    return <div>Hackathon hasn't been created yet</div>;
  }

  const eventStartDate = new Date(2025, 10, 8, 9, 30, 0); // Month is 0-indexed → 10 = November
  const eventEndDate = new Date(2025, 10, 9, 18, 0, 0); // Example: Sunday 5 PM

  return (
    <>
      <TeamInformation state={state} teamID={teamID} />
      <CountdownWindow
        eventStartDate={eventStartDate}
        eventEndDate={eventEndDate}
      >
        <h1 className="text-2xl font-semibold">
          <Underline noTick>Make sure to add to your Calendar!</Underline>
        </h1>
        <hr />
        {/* <CalendarSection /> */}
      </CountdownWindow>

      <div className="my-4 flex w-full justify-center text-white sm:justify-end">
        <Link href="/participant/profile">
          <PurpleButton className="w-48">Return</PurpleButton>
        </Link>
      </div>
    </>
  );
}
