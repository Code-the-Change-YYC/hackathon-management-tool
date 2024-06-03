import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default withAuthGuard(ProfileLayout, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);
