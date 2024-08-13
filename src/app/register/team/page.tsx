import Link from "next/link";

import PurpleButton from "@/components/PurpleButton";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";
import RegistrationLayout from "@/components/layouts/RegistrationLayout";
import JoinTeamInstructions from "@/components/teamRegistration/JoinTeamInstructions";
import { Underline } from "@/utils/text-utils";

function page() {
  return (
    <RegistrationLayout>
      <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 text-3xl md:p-8">
        <div className="flex flex-col items-center justify-center font-semibold md:items-start">
          <h1>Next steps...</h1>
          <Underline noTick>Create your team!</Underline>
        </div>
        <div className="flex flex-col gap-4 px-4">
          <h1 className="text-2xl font-semibold">Looking for a team?</h1>
          <JoinTeamInstructions />
        </div>
        <div className=" flex items-center justify-center">
          <h2 className="max-w-lg text-center font-bold">
            Ready to Register a new team or Join an existing team?
          </h2>
        </div>
        <div className="flex flex-col items-center justify-between text-white lg:flex-row">
          <Link href={"/register/team/remind"}>
            <PurpleButton>Remind me later</PurpleButton>
          </Link>
          <Link href={"/register/team/ready"}>
            <PurpleButton>Yes!</PurpleButton>
          </Link>
        </div>
      </div>
    </RegistrationLayout>
  );
}

export default withAuthGuard(page, [UserType.Participant]);
