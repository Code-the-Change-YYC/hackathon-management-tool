"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { Schema } from "@/amplify/data/resource";
import { useQuery } from "@tanstack/react-query";

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

const client = generateClient<Schema>();

const UserContext = createContext<IUserReturn>({} as IUserReturn);

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

        const response = await client.models.User.get({
          id: user.userSub as string,
        });

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
        console.error(err);
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

// export function useUser(): IUserReturn {
//   return useContext(UserContext);
// }
