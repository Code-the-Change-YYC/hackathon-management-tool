import type { Metadata } from "next";

import Greetings from "@/components/Dashboard/Greetings";
import NumFoodTickets from "@/components/Dashboard/NumFoodTickets";
import TeamRankings from "@/components/Dashboard/TeamRankings";
import TotalParticipants from "@/components/Dashboard/TotalParticipants";
import TotalTeams from "@/components/Dashboard/TotalTeams";

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
    <div className="flex w-full flex-1 flex-col gap-4 overflow-auto bg-slate-200 p-4 text-3xl font-semibold">
      <Greetings />
      <h1 className="text-2xl font-semibold">Hackathon Information</h1>
      <div className="grid grow auto-cols-auto grid-flow-col gap-4">
        <div className="">
          <TotalTeams />
          <div>Test</div>
        </div>
        <TotalParticipants />
        <NumFoodTickets />
      </div>
    </div>
  );
}
