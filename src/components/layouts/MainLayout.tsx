import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import JudgeShowcase from "@/components/JudgeShowcase";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {children}
      </main>
      <JudgeShowcase />
      <Footer />
    </>
  );
}
