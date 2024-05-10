import { fetchAuthSession } from "aws-amplify/auth";
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

export enum UserType {
  Admin = "Admin",
  Participant = "Participant",
  Judge = "Judge",
  Guest = "Guest",
}

export interface IUser {
  userSub: string;
  type: UserType;
  populated: boolean;
}

interface IUserReturn {
  currentUser: IUser;
  setCurrentUser: (state: IUser) => void;
}

// const UserContext = createContext<IUserReturn>({} as IUserReturn);

// export function UserContextProvider({ children }: Props) {
// const [currentUser, setCurrentUser] = useState<IUser>({
//   userSub: "",
//   type: UserType.GUEST,
//   populated: false,
// });
// TO DO load other user info from table
// useEffect(() => {
//   async function currentAuthenticatedUser() {
//     try {
//       const user = await fetchAuthSession();
//       setCurrentUser({
//         userSub: user.userSub as string,
//         type: (
//           user.tokens?.idToken?.payload["cognito:groups"] as UserType[]
//         )[0],
//         populated: true,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   void currentAuthenticatedUser();
// }, []);
// return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
// }

// export function useUser(): IUserReturn {
//   return useContext(UserContext);
// }
