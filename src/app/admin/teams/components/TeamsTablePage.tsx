import client from "@/components/_Amplify/AmplifyBackendClient";
import TeamsTable from "./TeamsTable";

const getTeams = client.models.Team.list({
  selectionSet: [
    "name",
    "approved",
    "id",
    "devPostLink",
    "members.id",
    "members.firstName",
    "members.lastName",
  ],
});
export type Team = Awaited<typeof getTeams>["data"][number];
export default async function TeamsTablePage() {
  const { data: teams } = await getTeams;
  if (!teams || !Array.isArray(teams)) return "No teams were found";
  return <TeamsTable teams={teams} />;
}
