import type { Metadata } from "next";

import CheckUserLoggedIn from "@/components/CheckUserLoggedIn";
import Greetings from "@/components/Dashboard/Greetings";
import NumFoodTickets from "@/components/Dashboard/NumFoodTickets";
import TeamRankings from "@/components/Dashboard/TeamRankings";
import TotalParticipants from "@/components/Dashboard/TotalParticipants";
import TotalTeams from "@/components/Dashboard/TotalTeams";
import { SuspenseWrapper } from "@/components/SuspenseWrapper";

export const dynamic = "force-dynamic";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Hack the Change - Admin",
  description: "Hack the Change Admin Portal",
  icons: [
    {
      rel: "icon",
      type: "image/ico",
      sizes: "32x32",
      url: "/favicon.ico",
    },
  ],
};
export default function page() {
  return (
    <div className="z-0 flex flex-1 flex-col gap-4 overflow-auto bg-slate-200 p-4 text-3xl font-semibold">
      <Greetings />
      <h1 className="text-2xl font-semibold">Hackathon Statistics</h1>
      <CheckUserLoggedIn>
        <div className="-mb-2 -ml-2 flex flex-1 flex-row flex-wrap gap-4 overflow-y-auto pb-2 pl-2 md:flex-nowrap ">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-1 flex-row gap-4">
              <SuspenseWrapper>
                <TotalTeams />
              </SuspenseWrapper>
              <SuspenseWrapper>
                <TotalParticipants />
              </SuspenseWrapper>
            </div>
            <SuspenseWrapper>
              <NumFoodTickets />
            </SuspenseWrapper>
          </div>
          <SuspenseWrapper>
            <TeamRankings />
          </SuspenseWrapper>
        </div>
      </CheckUserLoggedIn>
    </div>
  );
}
