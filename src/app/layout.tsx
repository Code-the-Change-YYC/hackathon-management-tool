import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";

import "@/app/globals.css";
import ConfigureAmplifyClientSide from "@/components/_Amplify/ConfigureAmplify";
// import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";
import "@aws-amplify/ui-react/styles.css";

const Omnes = localFont({
  src: "./fonts/Omnes Medium.ttf",
  variable: "--font-omnes",
});
export const metadata: Metadata = {
  title: "Hack the Change",
  description: "Hack the Change Participant Portal",
  icons: [
    {
      rel: "icon",
      type: "image/ico",
      sizes: "32x32",
      url: "/favicon.ico",
    },
  ],
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${Omnes.className}`}>
        <ConfigureAmplifyClientSide />
        {/* <UserContextProvider> */}
        <MainLayout>{children}</MainLayout>
        {/* </UserContextProvider> */}
      </body>
    </html>
  );
}

export default RootLayout;
