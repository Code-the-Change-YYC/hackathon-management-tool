"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { type UserDetailsNoFunctions } from "@/utils/amplify-utils";

interface UserDetailsContextType {
  userDetails: UserDetailsNoFunctions;
  setUserDetails: (u: UserDetailsNoFunctions) => void;
}

const UserDetailsContext = createContext<UserDetailsContextType>(
  {} as UserDetailsContextType,
);

export function UserDetailsProvider({
  initialUserDetails,
  children,
}: {
  initialUserDetails: UserDetailsNoFunctions;
  children: ReactNode;
}) {
  const [userDetails, setUserDetailsState] =
    useState<UserDetailsNoFunctions>(initialUserDetails);
  const setUserDetails = useCallback((upd: UserDetailsNoFunctions) => {
    setUserDetailsState((prev) => {
      if (
        prev.id === upd.id &&
        prev.completedRegistration === upd.completedRegistration &&
        prev.role === upd.role &&
        prev.email === upd.email &&
        prev.firstName === upd.firstName &&
        prev.lastName === upd.lastName &&
        prev.institution === upd.institution &&
        prev.allergies === upd.allergies &&
        prev.willEatMeals === upd.willEatMeals &&
        prev.checkedIn === upd.checkedIn &&
        prev.teamId === upd.teamId
        // add accordingly
      ) {
        return prev;
      }
      return upd;
    });
  }, []);

  const value = useMemo(() => {
    return { userDetails, setUserDetails };
  }, [userDetails, setUserDetails]);

  return (
    <UserDetailsContext.Provider value={{ ...value }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export function useUserDetails() {
  const ctx = useContext(UserDetailsContext);
  if (!ctx) {
    throw new Error("useUserDetails must be used within UserDetailsProvider");
  }
  return ctx;
}
