import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";

import "@/app/globals.css";
import "@aws-amplify/ui-react/styles.css";

import SideNavBar from "./components/SideNavBar";

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
    <div className="flex w-full">
      <SideNavBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default AdminLayout;
