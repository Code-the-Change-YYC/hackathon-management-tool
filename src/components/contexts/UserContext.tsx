"use client";

import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { client } from "@/app/QueryProvider";

import { getUserInfo } from "../hooks/useGetUser";

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
    username: "",
    type: UserType.Guest,
    populated: false,
  });

  const { data } = getUserInfo(currentUser.username);

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

        // const response = await client.models.User.get({
        //   id: user.tokens?.accessToken.payload.username as string,
        // });

        if (data === null) {
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
          completedProfile: data?.completedRegistration ?? false,
          email: data?.email ?? "",
          firstName: data?.firstName ?? "",
          lastName: data?.lastName ?? "",
        });
      } catch (err) {
        if (String(err).includes("No user")) {
          setCurrentUser({
            username: "",
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
  }, [data]);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {currentUser.populated && children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}
