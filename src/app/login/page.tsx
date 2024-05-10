// app/login/page.tsx
import Login from "@/components/_Amplify/Login";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

const LoginPage = () => {
  return <Login />;
};

export default withAuthGuard(LoginPage, [
  UserType.Admin,
  UserType.Guest,
  UserType.Judge,
  UserType.Participant,
]);
