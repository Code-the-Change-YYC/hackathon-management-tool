import client from "@/components/_Amplify/AmplifyBackendClient";

import UsersTable from "../components/UsersTable";

export default async function UserTablePage() {
  const { data: users } = await client.models.User.list({
    selectionSet: ["lastName", "firstName", "role", "teamId", "email", "id"],
  });
  if (!users || !Array.isArray(users)) return "No participants were found";
  return <UsersTable users={users} />;
}
