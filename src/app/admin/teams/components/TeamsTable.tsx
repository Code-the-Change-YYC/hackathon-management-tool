"use client";

import { useCallback, useMemo, useState } from "react";

import type { Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import { teamColumns } from "@/app/admin/teams/TeamTableSetup";
import tanstackTableHelper from "@/components/TanstackTableHelper";

import TableSearch from "./TableSearch";
import TeamTableBody from "./TanstackTableBody";
import TableFooter from "./TanstackTableFooter";
import TeamsTableHead from "./TanstackTableHead";
import type { Team } from "./TeamsTablePage";

export default function TeamsTable({ teams }: { teams: Team[] }) {
  const [data, setData] = useState(teams);
  const [globalFilter, setGlobalFilter] = useState("");
  const deleteTeam = async (id: Schema["Team"]["deleteType"]) =>
    client.models.Team.delete(id);
  const updateTeam = async (updatedData: Schema["Team"]["updateType"]) =>
    client.models.Team.update(updatedData);
  const table = tanstackTableHelper({
    data,
    columns: teamColumns,
    globalFilter,
    setGlobalFilter,
    setData,
    deleteElement: deleteTeam,
    updateElement: updateTeam,
    typeName: "Team",
  });
  return (
    <div className="teams group flex flex-1 flex-col justify-between overflow-hidden rounded-3xl bg-white p-2 text-xl outline  outline-awesomer-purple">
      <div className="overflow-x-auto">
        <div className="w-full">
          <TableSearch
            tableDataLength={table.getRowCount()}
            handleSearchChange={useCallback(
              (value: string) => setGlobalFilter(value),
              [],
            )}
          />
          <table className="ml-1.5 w-full border-separate border-spacing-x-0.5 p-2 md:ml-0">
            <TeamsTableHead
              table={useMemo(() => table.getHeaderGroups(), [table])}
            />
            <TeamTableBody table={table} />
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
    </div>
  );
}
