import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/app/globals.css";
import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";

const Omnes = localFont({
  src: "./fonts/Omnes Medium.ttf",
  variable: "--font-omnes",
});
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
      <body className={`${Omnes.className}`}>
        <UserContextProvider>
          <MainLayout>{children}</MainLayout>
        </UserContextProvider>
      </body>
    </html>
  );
}
