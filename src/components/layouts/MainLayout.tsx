import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PagePlaceholder from "@/components/PagePlaceholder";
import { UserDetailsProvider } from "@/components/contexts/UserDetailsContext";
import { enableLandingPage } from "@/featureFlags";
import {
  AuthGetCurrentUserDetails,
  type UserDetailsNoFunctions,
} from "@/utils/amplify-utils";

interface Props {
  children: ReactNode | ReactNode[];
}

export default async function MainLayout({ children }: Props) {
  const userDetails = await AuthGetCurrentUserDetails();

  // have to return a placeholder for this in the case that the user is a guest user
  return (
    <>
      {enableLandingPage ? (
        <PagePlaceholder />
      ) : (
        <>
          <UserDetailsProvider
            initialUserDetails={userDetails ?? ({} as UserDetailsNoFunctions)}
          >
            <Header />
            <main className="flex flex-1 flex-col items-center justify-between">
              {children}
            </main>
            <Footer />
          </UserDetailsProvider>
        </>
      )}
    </>
  );
}
