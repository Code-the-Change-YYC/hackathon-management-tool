import Image from "next/image";
import Link from "next/link";

import NewMember1 from "@/images/register/NewMember1.png";
import NewTeam1 from "@/images/register/NewTeam1.png";
import { Underline } from "@/utils/text-utils";

import JoinTeamInstructions from "../JoinTeamInstructions";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl bg-pastel-green p-4 text-xl font-light">
      {children}
    </div>
  );
}
const BUTTON_STYLES =
  "bg-awesomer-purple w-full p-2 hover:opacity-90 text-white transition duration-300 text-xl rounded-full border-4 border-white shadow-md md:w-[300px]";

export default function page() {
  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 text-3xl font-bold md:p-8">
      <div className="hidden flex-col flex-wrap items-center justify-center gap-2 text-center sm:flex sm:flex-row">
        <Underline>Register</Underline>
        your new team OR Join an existing team
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <Card>
          <Link href={"/register/team/new"}>
            <button className={BUTTON_STYLES}>Register New Team</button>
          </Link>
          <Image className="rounded-3xl bg-white p-4" src={NewTeam1} alt={""} />
        </Card>
        <Card>
          <Link href={"/register/team/existing"}>
            <button className={BUTTON_STYLES}>Join Existing Team</button>
          </Link>
          <Image
            className="rounded-3xl bg-white p-4"
            src={NewMember1}
            alt={""}
          />
        </Card>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-2 text-center sm:flex-row">
        <Underline>Looking for a team?</Underline>
      </div>
      <Card>
        <JoinTeamInstructions />
      </Card>
    </div>
  );
}
