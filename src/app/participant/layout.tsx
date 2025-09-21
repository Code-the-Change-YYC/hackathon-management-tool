"use client";

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
    <div className="flex w-full flex-1 flex-col bg-fuzzy-peach">{children}</div>
  );
}
