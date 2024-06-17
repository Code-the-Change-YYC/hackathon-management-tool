import type { Metadata } from "next";

import SideNavBar from "@/components/admin/SideNavBar";
import TopNavBar from "@/components/admin/TopNavBar";

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
    <div className="flex w-full flex-1">
      <SideNavBar />
      <div className="flex w-full flex-col">
        <TopNavBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
