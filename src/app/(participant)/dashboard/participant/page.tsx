import type { Metadata } from "next";

import DevPostSubmission from "@/components/Dashboard/DevPostSubmission";
import GoToFoodTicket from "@/components/Dashboard/GoToFoodTicket";
import Greetings from "@/components/Dashboard/Greetings";
import ImportantInformation from "@/components/Dashboard/ImportantInformation";
import JudgingInfo from "@/components/Dashboard/JudgingInfo";
import NextMealScheduled from "@/components/Dashboard/NextMealScheduled";

export const metadata: Metadata = {
  title: "Hack the Change - Participant",
  description: "Hack the Change Participant Portal",
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
      <div className="grid grow grid-flow-col gap-4">
        <div className="flex flex-col gap-4">
          <NextMealScheduled />
          <DevPostSubmission />
        </div>
        <div className="flex flex-col gap-4">
          <GoToFoodTicket />
          <JudgingInfo />
        </div>
        <ImportantInformation />
      </div>
    </div>
  );
}
