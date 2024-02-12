"use client";

import { type AuthUser, getCurrentUser } from "aws-amplify/auth";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

enum UserType {
  ADMIN = "admin",
  PARTICIPANT = "participant",
  JUDGE = "judge",
}

interface IUser {
  userInfo: AuthUser;
  type: UserType | undefined;
}

interface IUserReturn {
  currentUser: IUser;
  setCurrentUser: (state: IUser) => void;
}

const UserContext = createContext<IUserReturn>({} as IUserReturn);

export function UserContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    userInfo: {} as AuthUser,
    type: undefined,
  });
  // TO DO load other user info from table
  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails:`, signInDetails);
      } catch (err) {
        console.error(err);
      }
    }
    void currentAuthenticatedUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}
