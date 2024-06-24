import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import Greetings from "@/components/admin/Greetings";
import NumFoodTickets from "@/components/admin/NumFoodTickets";
import TeamRankings from "@/components/admin/TeamRankings";
import TotalParticipants from "@/components/admin/TotalParticipants";
import TotalTeams from "@/components/admin/TotalTeams";

export default function page() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto bg-slate-200 p-4 text-3xl font-semibold">
      <Greetings />
      <h1 className="text-2xl font-semibold">Hackathon Statistics</h1>
      <div className="-mb-2 -ml-2 flex flex-1 flex-row gap-4 overflow-y-auto pb-2 pl-2 ">
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
        <TeamRankings />
      </div>
    </div>
  );
}
export function SuspenseWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className={twMerge("size-full", className)}>
          <Skeleton height={"100%"} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
