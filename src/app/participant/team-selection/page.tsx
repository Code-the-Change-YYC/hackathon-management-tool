import CreateTeamPage from "@/app/participant/team-selection/CreateTeamPage";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function TeamSelection() {
  return (
    <main>
      <CreateTeamPage />
    </main>
  );
}

export default withAuthGuard(TeamSelection, [UserType.Participant]);
