import TeamConfirmation from "@/components/teamRegistration/TeamConfirmation";

export default function page({ params }: { params: { teamID: string } }) {
  return <TeamConfirmation state="Registered" teamID={params.teamID} />;
}
