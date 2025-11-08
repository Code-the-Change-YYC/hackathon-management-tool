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
  //paginate incoming data
  let allUsers: User[] = [];
  let nextToken: string | null | undefined = undefined;

  do {
    const {
      data: users,
      nextToken: token,
    }: { data?: User[]; nextToken?: string | null } =
      await client.models.User.list({
        selectionSet,
        nextToken,
        limit: 1000,
      });

    if (users && Array.isArray(users)) {
      allUsers = [...allUsers, ...users];
    }

    nextToken = token;
  } while (nextToken);

  if (!allUsers || allUsers.length === 0) return "No participants were found";
  return <UsersTable users={allUsers} />;
}
