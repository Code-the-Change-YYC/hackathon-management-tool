import type { Schema } from "@/amplify/data/resource";
import client from "@/components/_Amplify/AmplifyBackendClient";

import TeamMembers from "./TeamMembers";

type Members = Pick<
  Schema["User"]["type"],
  "id" | "firstName" | "lastName" | "checkedIn"
>;
export type Team = Pick<Schema["Team"]["type"], "name" | "approved" | "id"> & {
  members: Members[];
};
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
      name: t.name,
      approved: t.approved,
      id: t.id,
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
