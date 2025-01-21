import dynamic from "next/dynamic";

import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

// Dynamically import UserProfile with preloading
const UserProfile = dynamic(
  () => import("@/components/UserProfile/UserProfile"),
  {
    ssr: false, 
    loading: () => <p>Loading user profile...</p>,
  },
);

function Profile() {
  return <UserProfile />;
}

export default withAuthGuard(Profile, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);
