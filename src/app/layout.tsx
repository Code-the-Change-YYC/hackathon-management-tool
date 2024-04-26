import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import ConfigureAmplifyClientSide from "@/components/_Amplify/ConfigureAmplify";
// import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";
import "@aws-amplify/ui-react/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hack the Change",
  description: "Hack the Change management tool",
};
const queryClient = new QueryClient({});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <ConfigureAmplifyClientSide />
          {/* <UserContextProvider> */}
          <MainLayout>{children}</MainLayout>
          {/* </UserContextProvider> */}
        </body>
      </html>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default RootLayout;
