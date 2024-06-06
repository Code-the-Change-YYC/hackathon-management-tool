import PurpleButton from "@/components/PurpleButton";
import { Underline } from "@/utils/text-utils";

import CountdownWindow from "./CountdownWindow";

const TeamInformation = ({
  teamID,
  teamName,
}: {
  teamID: string;
  teamName: string;
}) => {
  return (
    <div className="flex flex-col gap-8 py-8 text-neutral-700">
      <h1 className=" text-center text-5xl font-semibold">
        {teamName + "'s"} Team ID is: <br /> {teamID}
      </h1>
      <div className="text-center text-xl font-medium">
        <span className="">
          Provide this ID to all team members.
          <br />
          Each member
        </span>
        <span className="font-semibold"> must </span>
        <span>
          submit this Team ID <br /> to
        </span>
        <span className="font-semibold"> Join Existing Team</span>
        <span> to participate in the Hackathon.</span>
      </div>
    </div>
  );
};
export default function page({ params }: { params: { teamID: string } }) {
  const teamID = "1-2-3-4-5-6";
  return (
    <>
      <TeamInformation teamName={params.teamID} teamID={teamID} />
      <CountdownWindow>
        <h1 className="text-2xl font-semibold">
          <Underline noTick>Add to Calendar</Underline>
        </h1>
        <hr />
        <div className=" flex w-full justify-evenly gap-4 text-white">
          <PurpleButton>Google</PurpleButton>
          <PurpleButton>Outlook</PurpleButton>
          <PurpleButton>iCal</PurpleButton>
        </div>
      </CountdownWindow>

      <div className="my-4 flex w-full justify-end text-white">
        <PurpleButton>Return</PurpleButton>
      </div>
    </>
  );
}
