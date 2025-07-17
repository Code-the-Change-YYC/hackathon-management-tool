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
    <div className="flex h-[90dvh] w-full">
      <div className="sm:w-1/8 md:w-20 ">
        <SideNavBar />
      </div>
      <div className="flex w-4/5 flex-1 flex-col ">
        <TopNavBar />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
