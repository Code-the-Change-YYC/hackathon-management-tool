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

export interface IUser {
  username: string;
  type: UserType;
  completedProfile?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  teamId?: string;
  populated: boolean;
  JUDGE_roomId: string;
}

interface IUserReturn {
  currentUser: IUser;
  revalidateUser: () => void;
  isFetching: boolean;
  // setCurrentUser: (state: IUser) => void;
}

const client = generateClient<Schema>();

export const UserContext = createContext<IUserReturn>({} as IUserReturn);

export function UserContextProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const {
    data: currentUser,
    refetch,
    isFetching,
  } = useQuery({
    initialData: {
      username: "",
      type: UserType.Guest,
      populated: false,
      JUDGE_roomId: "",
    },
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
            username: user.userSub as string,
            type: (
              user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
            ).filter((group) => Object.keys(UserType).includes(group))?.[0],
            populated: true,
            completedProfile: response.data?.completedRegistration ?? false,
            email: response.data?.email ?? "",
            teamId: response.data?.teamId ?? "",
            firstName: response.data?.firstName ?? "",
            lastName: response.data?.lastName ?? "",
            JUDGE_roomId: response.data?.JUDGE_roomId,
          } as IUser;
        } catch (error) {
          console.error(error);
        }
        // Set user information based on the authentication session...
      } catch (error) {
        if (String(error).includes("No user")) {
          console.info("Not Logged in");
          return {
            username: "",
            type: UserType.Guest,
            populated: true,
          } as IUser;
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
          queryClient.setQueryData(["User"], {
            username: "",
            type: UserType.Guest,
            populated: true,
          } as IUser);
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
