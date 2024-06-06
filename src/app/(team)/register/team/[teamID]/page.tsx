import { Underline } from "@/utils/text-utils";

import CountdownWindow from "./CountdownWindow";

const BUTTON_STYLES =
  "bg-awesomer-purple py-2 hover:opacity-90 transition duration-300 font-medium text-xl rounded-full border-4 border-white shadow-md w-48";

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
          <button className={BUTTON_STYLES}>Google</button>
          <button className={BUTTON_STYLES}>Outlook</button>
          <button className={BUTTON_STYLES}>iCal</button>
        </div>
      </CountdownWindow>

      <div className="my-4 flex w-full justify-end text-white">
        <button className={BUTTON_STYLES}>Return</button>
      </div>
    </>
  );
}
