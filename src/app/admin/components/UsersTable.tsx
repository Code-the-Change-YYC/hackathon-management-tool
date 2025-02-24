"use client";

import { useCallback, useMemo, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import tanstackTableHelper from "@/components/TanstackTableHelper";

import TableSearch from "../teams/components/TableSearch";
import TanstackTableBody from "../teams/components/TanstackTableBody";
import TableFooter from "../teams/components/TanstackTableFooter";
import TanstackTableHead from "../teams/components/TanstackTableHead";
import type { User } from "../users/UserTablePage";
import { usersColumns } from "./UsersTableSetup";

export default function UsersTable({ users }: { users: User[] }) {
  const [data, setData] = useState(users);
  const [globalFilter, setGlobalFilter] = useState("");
  const deleteUser = async (id: Schema["User"]["deleteType"]) =>
    client.models.User.delete(id);
  const updateUser = async (updatedData: Schema["User"]["updateType"]) => {
    return client.models.User.update({
      id: updatedData.id,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      role: updatedData.role,
      teamId: updatedData.teamId,
    });
  };
  const table = tanstackTableHelper({
    data,
    columns: usersColumns,
    globalFilter,
    setGlobalFilter,
    deleteElement: deleteUser,
    updateElement: updateUser,
    setData,
    typeName: "User",
  });
  return (
    <div className="users group flex flex-1 flex-col justify-between overflow-x-auto rounded-3xl bg-white p-2 text-xl outline  outline-awesomer-purple">
      <div className="w-full">
        <TableSearch
          tableDataLength={table.getRowCount()}
          handleSearchChange={useCallback(
            (value: string) => setGlobalFilter(value),
            [],
          )}
        />
        <table className="w-full border-separate border-spacing-x-0.5 p-2">
          <TanstackTableHead
            table={useMemo(() => table.getHeaderGroups(), [table])}
          />
          <TanstackTableBody table={table} />
          <tfoot>
            <tr>
              <th
                colSpan={table.getAllColumns().length}
                className="rounded-b-xl bg-awesome-purple p-4 text-white"
              />
            </tr>
          </tfoot>
        </table>
      </div>
      <TableFooter table={table} />
    </div>
  );
}
