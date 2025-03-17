import type { Metadata } from "next";

import NavBar from "@/components/judging/Navbar";

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
    <main className="flex w-full flex-1 flex-col gap-4 bg-dashboard-grey">
      <NavBar />
      <JudgingDashboard />
    </main>
  );
}
