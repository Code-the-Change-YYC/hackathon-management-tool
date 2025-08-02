"use client";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { createContext, useContext, useEffect, type ReactNode } from "react";
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

type IUser = Schema["User"]["type"] & {
  type: UserType;
  username: string;
};

interface IUserReturn {
  currentUser: IUser;
  revalidateUser: () => void;
  isFetching: boolean;
}

const GUEST_USER = {
  id: "",
  createdAt: "",
  updatedAt: "",
  username: "",
  type: UserType.Guest,
  team: () => {
    throw new Error("Function not implemented on GUEST.");
  },
  attendedEvents: () => {
    throw new Error("Function not implemented on GUEST.");
  },
  JUDGE_givenScores: () => {
    throw new Error("Function not implemented on GUEST.");
  },
  JUDGE_room: () => {
    throw new Error("Function not implemented on GUEST.");
  },
} satisfies IUser;
const client = generateClient<Schema>();

const UserContext = createContext<IUserReturn>({} as IUserReturn);
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
        const userRole = (
          user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
        ).filter((group) => Object.keys(UserType).includes(group))?.[0];

        if (!userRole) {
          // Logout User if not in group
          signOut();
          console.error("User not in group");
        }
        if (!user.userSub) {
          throw new Error("No user");
        }

        const response = await client.models.User.get({
          id: user.userSub,
        });

        if (response.errors) throw new Error(response.errors[0].message);

        if (!response.data) {
          // Logout User record does not exist in DB
          signOut();
          throw new Error("User not in DB");
        }
        return {
          ...response.data,
          username: user.userSub,
          type: userRole,
        } as IUser;
        // Set user information based on the authentication session...
      } catch (error) {
        if (String(error).includes("No user")) {
          console.info("Not Logged in");
          return GUEST_USER;
        }
        console.error(error);
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

export function useUser() {
  return useContext(UserContext);
}
