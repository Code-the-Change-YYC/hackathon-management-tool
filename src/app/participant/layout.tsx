"use client";

import UserBasedNav from "@/components/Dashboard/UserBasedNav";

export default function RoleBasedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For Admin layouts we might want to show a SideNavBar/TopNavBar
  // You can use the same hook or control it separately if needed.
  // Here we assume non-admin users only need the nav rendered by UserBasedNav.

  // This example uses the UserBasedNav component in the layout:
  return (
    <div className="flex min-h-screen flex-col bg-dashboard-grey">
      <UserBasedNav />
      <main className="">{children}</main>
    </div>
  );
}
