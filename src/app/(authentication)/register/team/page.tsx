import Link from "next/link";

import { Underline } from "@/utils/text-utils";

import JoinTeamInstructions from "./JoinTeamInstructions";

const BUTTON_STYLES =
  "bg-awesomer-purple w-full py-2 hover:opacity-90 transition duration-300 font-medium text-xl rounded-full border-4 border-white shadow-md w-[300px]";

export default function page() {
  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 md:p-8">
      <div className="flex flex-col items-center justify-center text-3xl font-semibold md:items-start">
        <h1>Next steps...</h1>
        <Underline noTick>Create your team!</Underline>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-semibold">Looking for a team?</h1>
        <JoinTeamInstructions />
      </div>
      <div className=" flex items-center justify-center">
        <h2 className="max-w-lg text-center text-4xl font-bold">
          Ready to Register a new team or Join an existing team?
        </h2>
      </div>
      <div className="flex flex-col items-center justify-between text-white lg:flex-row">
        <Link href={"/register/team/remind"}>
          <button className={BUTTON_STYLES}>Remind me later</button>
        </Link>
        <Link href={"/register/team/ready"}>
          <button className={BUTTON_STYLES}>Yes!</button>
        </Link>
      </div>
    </div>
  );
}
