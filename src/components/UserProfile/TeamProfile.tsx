"use client";

import Link from "next/link";

import TeamForm from "@/components/UserProfile/TeamForm";
import { useUser } from "@/components/contexts/UserContext";

export default function TeamProfile() {
  const {
    currentUser: { teamId: userTeamId },
  } = useUser();
  if (!userTeamId) {
    return (
      <div>
        <p className="mx-10">
          Oops, looks like you’re not in a team yet. Are you looking to join a
          team?
        </p>
        <div className="bg-pink m-10 rounded-3xl border-4 border-white   bg-white/30 px-10 py-20 md:px-20 md:py-16">
          <h1 className="mb-10 text-3xl font-bold">Looking for a team?</h1>
          <ol className="space-y-4 pl-4">
            <li>
              1. Join the <strong>Code the Change YYC</strong> Discord and
              navigate to the #looking-for-a-team channel.
            </li>
            <li>
              2. Reach out to an <strong>existing</strong> team or form a new
              team.
            </li>
            <li>
              3. After forming a team , assign <strong>ONE</strong> member to
              “Register New Team” using your Team Name. They will receive a
              unique 4-digit Team ID following registration.
            </li>
            <li>
              4. Next, provide this 4-digit <strong>Team ID</strong> to all team
              members.
            </li>
            <li>
              5. <strong>EACH</strong> team member <strong>must</strong>{" "}
              navigate to <strong>“Join Existing Team”</strong> to submit this
              ID to officially join the group.
            </li>
          </ol>
        </div>
        <div className="my-6 flex justify-end">
          <button
            className={`bg-apricot md:px-12" mx-10 my-2 w-full  rounded-full border-4 border-white px-10 py-2 text-white md:w-auto`}
          >
            <Link href="/register/team">Create/Join Team</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="  text-apricot mb-3 flex justify-between uppercase md:mx-10">
        <h1 className="my-4 text-lg font-bold md:mt-3 md:text-2xl">
          Team Details
        </h1>
      </div>
      <TeamForm />
    </>
  );
}
