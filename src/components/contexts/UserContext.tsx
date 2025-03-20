"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useContext } from "react";
import { type ReactNode, createContext, useEffect } from "react";

import { type Schema } from "@/amplify/data/resource";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  children: ReactNode | ReactNode[];
}

export enum UserType {
  Admin = "Admin",
  Participant = "Participant",
  Judge = "Judge",
  Guest = "Guest",
}

type StripFunctions<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
export type IUser = StripFunctions<Schema["User"]["type"]> & {
  type: UserType;
  username: string;
};

interface IUserReturn {
  currentUser: IUser;
  revalidateUser: () => void;
  isFetching: boolean;
}

const GUEST_USER: IUser = {
  id: "",
  createdAt: "",
  updatedAt: "",
  username: "",
  type: UserType.Guest,
};
const client = generateClient<Schema>();

export const UserContext = createContext<IUserReturn>({} as IUserReturn);
export function UserContextProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const {
    data: currentUser,
    refetch,
    isFetching,
  } = useQuery({
    initialData: GUEST_USER,
    queryKey: ["User"],
    queryFn: async () => {
      try {
        const user = await fetchAuthSession();

        if (
          (
            user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
          )?.[0] === undefined
        ) {
          // Logout User if not in group
          signOut();
          console.error("User not in group");
        }
        if (!user.userSub) {
          throw new Error("No user");
        }

        try {
          const response = await client.models.User.get({
            id: user.userSub as string,
          });

          if (response.errors) throw new Error(response.errors[0].message);

          if (response.data === null) {
            // Logout User record does not exist in DB
            signOut();
            console.error("User not in DB");
          }
          return {
            ...response.data,
            username: user.userSub as string,
            type: (
              user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
            ).filter((group) => Object.keys(UserType).includes(group))?.[0],
          } as IUser;
        } catch (error) {
          console.error(error);
        }
        // Set user information based on the authentication session...
      } catch (error) {
        if (String(error).includes("No user")) {
          console.info("Not Logged in");
          return GUEST_USER;
        } else {
          console.error(error);
        }
      }
    },
  });
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          queryClient.invalidateQueries({
            queryKey: ["User"],
            exact: false,
          });
          console.log("Signed In");
          break;
        case "signedOut":
          queryClient.setQueryData(["User"], GUEST_USER);
          console.log("Signed Out");
          break;
      }
    });

    // Clean up the listener
    return () => {
      hubListenerCancel();
    };
  }, []);

  return (
    currentUser && (
      <UserContext.Provider
        value={{
          currentUser: currentUser,
          revalidateUser: refetch,
          isFetching: isFetching,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  );
}

export function useUser(): IUserReturn {
  return useContext(UserContext);
}
