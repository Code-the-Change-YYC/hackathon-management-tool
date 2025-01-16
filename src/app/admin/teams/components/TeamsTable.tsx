import client from "@/components/_Amplify/AmplifyBackendClient";

import type { Team } from "../tanstackTableSetup";
import TeamMembers from "./TeamMembers";

export default async function TeamsTable() {
  const { data: team } = await client.models.Team.list({
    selectionSet: [
      "name",
      "approved",
      "id",
      "members.id",
      "members.firstName",
      "members.lastName",
      "members.checkedIn",
    ],
  });
  if (!team || !Array.isArray(team))
    return <div className="">No teams were found</div>;
  else {
    const teamData: Team[] = team.map((t) => ({
      teamName: t.name,
      approvedStatus: t.approved,
      teamID: t.id,
      members: t.members.map((m) => ({
        id: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        checkedIn: m.checkedIn,
      })),
    }));
    return <TeamMembers team={teamData} />;
  }
}
