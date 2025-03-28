import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import "@/app/globals.css";
import ConfigureAmplifyClientSide from "@/components/_Amplify/ConfigureAmplify";
import Provider from "@/components/contexts/Provider";
import ToastProvider from "@/components/contexts/ToastProvider";
import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";
import "@aws-amplify/ui-react/styles.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <body
        className={`${Omnes.className} flex size-full min-h-screen w-dvw flex-col bg-white dark:text-black`}
      >
        <ToastProvider>
          <Provider>
            <ConfigureAmplifyClientSide />
            <UserContextProvider>
              <MainLayout>{children}</MainLayout>
            </UserContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </ToastProvider>
      </body>
    </html>
  );
}

export default RootLayout;
