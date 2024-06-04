import UserProfile from "@/components/UserProfile/UserProfile";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function Profile() {
  return <UserProfile />;
}

export default withAuthGuard(Profile, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);
