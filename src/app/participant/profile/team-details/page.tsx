import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";
import TeamProfile from "@/components/UserProfile/TeamProfile";

function TeamDetails() {
  return <TeamProfile />;
}

export default withAuthGuard(TeamDetails, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);
