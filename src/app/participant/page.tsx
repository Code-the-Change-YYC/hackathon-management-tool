import type { Metadata } from "next";
import GoToFoodTicket from "@/components/Dashboard/GoToFoodTicket";
import Greetings from "@/components/Dashboard/Greetings";
import ImportantInformation from "@/components/Dashboard/ImportantInformation";
import JudgingInfo from "@/components/Dashboard/JudgingInfo";
import NextMealScheduled from "@/components/Dashboard/NextMealScheduled";
import SubmissionDue from "@/components/Dashboard/SubmissionDue";
import { SuspenseWrapper } from "@/components/SuspenseWrapper";

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
    <div className="flex w-full flex-1 flex-col gap-4 overflow-auto bg-dashboard-grey p-4 text-3xl font-semibold">
      <Greetings />
      <h1 className="text-2xl font-semibold">Hackathon Information</h1>
      <div className="grid grow grid-cols-1 gap-4 md:grid-cols-2 xl:grid-flow-col xl:grid-cols-none">
        <div className="flex flex-col gap-4">
          <NextMealScheduled />
          <GoToFoodTicket />
        </div>
        <div className="flex flex-col gap-4">
          <ImportantInformation />
        </div>
        <div className="flex flex-col gap-4 md:col-span-2">
          <JudgingInfo />
          <SuspenseWrapper>
            <SubmissionDue />
          </SuspenseWrapper>
        </div>
      </div>
    </div>
  );
}
