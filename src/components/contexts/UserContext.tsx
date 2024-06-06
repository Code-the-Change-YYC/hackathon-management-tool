"use client";

import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { client } from "@/app/QueryProvider";

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
  userSub: string;
  type: UserType;
  completedProfile?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  teamId?: string;
  populated: boolean;
}

interface IUserReturn {
  currentUser: IUser;
  // setCurrentUser: (state: IUser) => void;
}

export const UserContext = createContext<IUserReturn>({} as IUserReturn);

export function UserContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    userSub: "",
    type: UserType.Guest,
    populated: false,
  });
  // TO DO load other user info from table
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
          id: user.userSub as string,
        });

        if (response.data === null) {
          // Logout User record does not exist in DB
          signOut();
          console.error("User not in DB");
        }

        setCurrentUser({
          userSub: user.userSub as string,
          type: (
            user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
          )?.[0],
          populated: true,
          // TODO ONCE JUSTIN ADDS completed Field to signup flow
          completedProfile: true,
          email: response.data?.email ?? "",
          firstName: response.data?.firstName ?? "",
          lastName: response.data?.lastName ?? "",
        });
      } catch (err) {
        if (String(err).includes("No user")) {
          setCurrentUser({
            userSub: "",
            type: UserType.Guest,
            populated: true,
          });
          console.info("Not Logged in");
        } else {
          console.error(err);
        }
      }
    }
    void currentAuthenticatedUser();
  }, []);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {currentUser.populated && children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}
