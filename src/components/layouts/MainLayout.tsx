import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
