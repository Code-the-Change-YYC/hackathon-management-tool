import type { Schema } from "@/amplify/data/resource";
import client from "@/components/_Amplify/AmplifyBackendClient";
import TeamsTable from "./TeamsTable";

type Members = Pick<
  Schema["User"]["type"],
  "id" | "firstName" | "lastName" | "checkedIn"
>;
export type Team = Pick<Schema["Team"]["type"], "name" | "approved" | "id"> & {
  members: Members[];
};
export default async function TeamsTablePage() {
  const { data: teams } = await client.models.Team.list({
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
  if (!teams || !Array.isArray(teams)) return "No teams were found";
  return <TeamsTable teams={teams} />;
}
