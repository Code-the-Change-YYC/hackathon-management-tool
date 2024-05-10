import { redirect } from "next/navigation";
import React from "react";

import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";

import { UserType } from "../contexts/UserContext";

const withAuthGuard = (
  WrappedComponent: React.ComponentType<any>,
  allowedUsers: UserType[],
) => {
  return () => {
    // FOR SSR
    const userTypeHasPagePermission = (type: UserType) => {
      if (allowedUsers.includes(UserType[type])) {
        return <WrappedComponent />;
      } else {
        redirect("/login");
      }
    };

    return AuthGetCurrentUserServer()
      .then((user) => {
        if (user?.tokens) {
          return userTypeHasPagePermission(
            (user?.tokens?.idToken?.payload["cognito:groups"] as UserType[])[0],
          );
        } else {
          return userTypeHasPagePermission(UserType.Guest);
        }
      })
      .catch((err) => {
        console.error(err);
        redirect("/login");
      });
  };
};

export default withAuthGuard;
