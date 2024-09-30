import type { Metadata } from "next";

import SideNavBar from "@/components/Dashboard/SideNavBar";
import TopNavBar from "@/components/Dashboard/TopNavBar";

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

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-1">
      <SideNavBar />
      <div className="flex flex-1 flex-col">
        <TopNavBar />
        <main className="grow">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
