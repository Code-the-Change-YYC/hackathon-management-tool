import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";
import UserProfile from "@/components/UserProfile/UserProfile";

function Profile() {
  return <UserProfile />;
}
