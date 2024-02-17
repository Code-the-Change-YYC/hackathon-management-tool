import type { ReactNode } from "react";

import Footer from "@/components/Footer";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </main>
      <Footer></Footer>
    </>
  );
}
