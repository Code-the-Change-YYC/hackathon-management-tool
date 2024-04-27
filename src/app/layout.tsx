"use client";

import { Inter } from "next/font/google";

import "@/app/globals.css";
import ConfigureAmplifyClientSide from "@/components/_Amplify/ConfigureAmplify";
// import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";
import "@aws-amplify/ui-react/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ConfigureAmplifyClientSide />
          {/* <UserContextProvider> */}
          <MainLayout>{children}</MainLayout>
          {/* </UserContextProvider> */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
