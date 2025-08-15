import type { ReactNode } from "react";
import { AuthGetAuthSession } from "@/utils/amplify-utils";

export default async function CheckUserLoggedIn({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const user = await AuthGetAuthSession();
    if (!user?.tokens) {
      throw new Error("User is not logged in.");
    }
    // console.log(user);
    return <>{children}</>;
  } catch (error) {
    console.error(error);
    return <div>User is not logged in.</div>;
  }
}
