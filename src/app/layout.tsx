import { Amplify } from "aws-amplify";
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

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolClientId: process.env.AMPLIFY_AUTH_USERPOOL_CLIENT_ID as string,
        userPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
        loginWith: {
          // Optional
          oauth: {
            domain:
              "https://31dc4e7007a19eca745c.auth.ca-central-1.amazoncognito.com",
            scopes: [
              "openid",
              "email",
              "phone",
              "profile",
              "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
            redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
            responseType: "code",
          },
          username: "true",
          email: "false", // Optional
          phone: "false", // Optional
        },
      },
    },
  },
  { ssr: true },
);

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
        className={`${Omnes.className} flex size-full min-h-screen flex-col bg-white dark:text-black`}
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