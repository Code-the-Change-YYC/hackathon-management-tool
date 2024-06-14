"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";

interface Props {
  children: ReactNode | ReactNode[];
}

export enum UserType {
  Admin = "Admin",
  Participant = "Participant",
  Judge = "Judge",
  Guest = "Guest",
}

export interface IUser {
  username: string;
  type: UserType;
  completedProfile?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  isReady: boolean;
  teamId?: string;
  populated: boolean;
}

interface IUserReturn {
  currentUser: IUser;
  // setCurrentUser: (state: IUser) => void;
}

const client = generateClient<Schema>();

export const UserContext = createContext<IUserReturn>({} as IUserReturn);

export function UserContextProvider({ children }: Props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<IUser>({
    username: "",
    type: UserType.Guest,
    populated: false,
    isReady: false,
  });
  // TO DO load other user info from table
  const checkRegistrationGuard = () => {
    if (currentUser.type === UserType.Guest) {
      return;
    }
    if (!currentUser.completedProfile) {
      window.location.replace("/login");
    }
    if (!currentUser.teamId && currentUser.type === UserType.Participant) {
      if (
        router.pathname === "/participant/profile/team" ||
        router.pathname === "/register/team"
      ) {
      } else {
        window.location.replace("/participant/profile/team");
      }
    }

    setCurrentUser({ ...currentUser, isReady: true });
  };
  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const user = await fetchAuthSession();
        if (!user.userSub) {
          throw new Error("No user");
        }

        if (
          (
            user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
          )?.[0] === undefined
        ) {
          // Logout User if not in group
          signOut();
          console.error("User not in group");
        }

        const response = await client.models.User.get({
          id: user.tokens?.accessToken.payload.username as string,
        });

        if (response.data === null) {
          // Logout User record does not exist in DB
          signOut();
          console.error("User not in DB");
        }

        setCurrentUser({
          username: user.tokens?.accessToken.payload.username as string,
          type: (
            user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
          )?.[0],
          populated: true,
          isReady: false,
          completedProfile: response.data?.completedRegistration ?? false,
          email: response.data?.email ?? "",
          firstName: response.data?.firstName ?? "",
          lastName: response.data?.lastName ?? "",
        });
      } catch (err) {
        if (String(err).includes("No user")) {
          setCurrentUser({
            username: "",
            type: UserType.Guest,
            populated: true,
            isReady: false,
          });
          console.info("Not Logged in");
        } else {
          console.error(err);
        }
      }
    }
    void currentAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (currentUser.populated) {
      checkRegistrationGuard();
    }
  }, [currentUser.populated]);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {currentUser.isReady && children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}
