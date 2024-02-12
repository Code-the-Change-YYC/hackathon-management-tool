import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hack the Change",
  description: "Hack the Change management tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <MainLayout>{children}</MainLayout>
        </UserContextProvider>
      </body>
    </html>
  );
}
