"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { type UserDetailsNoFunctions } from "@/utils/amplify-utils";
import { useQuery } from "@tanstack/react-query";

interface UserDetailsContextType {
  userDetails: UserDetailsNoFunctions;
  isLoading: boolean;
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
  const queryKey = ["User"];

  async function fetchUserDetails(): Promise<UserDetailsNoFunctions> {
    const resp = await fetch("/api/user");
    if (!resp || !resp.ok) throw new Error("Failed to fetch user details");
    return await resp.json();
  }

  const { data: userDetails, isLoading } = useQuery<UserDetailsNoFunctions>({
    queryKey,
    queryFn: fetchUserDetails,
    initialData: initialUserDetails,
    // if initial data already exists you dont need to refetch:
    refetchOnMount: initialUserDetails ? false : true,
    // arbitreay stale time of 5 minutes
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const value = useMemo(() => {
    return { userDetails, isLoading };
  }, [userDetails, isLoading]);

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
