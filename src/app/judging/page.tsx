"use client";

import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

import JudgingDashboard from "./JudgingDashboard";

function Judging() {
  return (
    <main className="w-full bg-dashboard-grey">
      <JudgingDashboard />
    </main>
  );
}

export default withAuthGuard(Judging, [UserType.Judge]);
