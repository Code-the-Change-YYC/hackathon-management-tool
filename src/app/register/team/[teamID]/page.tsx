import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";
import RegistrationLayout from "@/components/layouts/RegistrationLayout";
import TeamConfirmation from "@/components/teamRegistration/TeamConfirmation";

function page({ params }: { params: { teamID: string } }) {
  return (
    <RegistrationLayout header={null} footer={null} bgColor="bg-pastel-green">
      <TeamConfirmation state="Registered" teamID={params.teamID} />
    </RegistrationLayout>
  );
}

export default withAuthGuard(page, [UserType.Participant]);
