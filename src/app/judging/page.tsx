import type { Metadata } from "next";

import JudgingDashboard from "./JudgingDashboard";

export const dynamic = "force-dynamic";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Hack the Change - Judging",
  description: "Hack the Change Juding Portal",
  icons: [
    {
      rel: "icon",
      type: "image/ico",
      sizes: "32x32",
      url: "/favicon.ico",
    },
  ],
};
export default function Judging() {
  return (
    <main className="w-full bg-dashboard-grey">
      <JudgingDashboard />
    </main>
  );
}
