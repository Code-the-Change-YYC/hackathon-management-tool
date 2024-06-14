import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PagePlaceholder from "@/components/PagePlaceholder";
import { enableLandingPage } from "@/featureFlags";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      {enableLandingPage ? (
        <PagePlaceholder />
      ) : (
        <>
          <Header />
          <main className="flex flex-1 flex-col items-center justify-between">
            {children}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
