import TeamProfile from "@/components/UserProfile/TeamProfile";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function TeamDetails() {
  return <TeamProfile />;
}

export default withAuthGuard(TeamDetails, [
  UserType.Participant,
  UserType.Admin,
  UserType.Judge,
]);
