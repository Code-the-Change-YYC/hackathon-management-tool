import NavBar from "@/components/judging/Navbar";

export default function JudgingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-full flex-col bg-dashboard-grey">
      <NavBar />
      <main className="flex flex-1 flex-col gap-4">{children}</main>
    </div>
  );
}
