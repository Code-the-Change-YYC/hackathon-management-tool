import type { Schema } from "@/amplify/data/resource";
import client from "@/components/_Amplify/AmplifyBackendClient";
import UsersTable from "../components/UsersTable";

const selectionSet = [
  "lastName",
  "firstName",
  "role",
  "teamId",
  "email",
  "id",
] as const;

export type User = Pick<Schema["User"]["type"], (typeof selectionSet)[number]>;

export default async function UserTablePage() {
  const { data: users } = await client.models.User.list({
    selectionSet,
  });
  if (!users || !Array.isArray(users)) return "No participants were found";
  return <UsersTable users={users} />;
}
