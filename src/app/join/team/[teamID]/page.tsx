import RegistrationLayout from "@/components/layouts/RegistrationLayout";
import TeamConfirmation from "@/components/teamRegistration/TeamConfirmation";

export default function page({ params }: { params: { teamID: string } }) {
  return (
    <RegistrationLayout header={null} footer={null} bgColor="bg-pastel-green">
      <TeamConfirmation state="Joined" teamID={params.teamID} />
    </RegistrationLayout>
  );
}
