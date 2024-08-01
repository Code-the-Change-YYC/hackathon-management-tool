import Link from "next/link";

import PurpleButton from "@/components/PurpleButton";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function page() {
  // TODO: Add a reminder to join a team in two days
  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 md:p-8">
      <div className=" py-24 text-center text-3xl font-bold">
        {/* TODO: Update "two" to be dynamic */}
        We will remind you to join a team in two days!
      </div>
      <div className="flex justify-end">
        <Link href={"/"}>
          <PurpleButton>Close</PurpleButton>
        </Link>
      </div>
    </div>
  );
}

export default withAuthGuard(page, [UserType.Participant]);
