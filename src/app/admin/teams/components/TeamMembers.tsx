"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import type { Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Team } from "../tanstackTableSetup";
import { tableSettings } from "../tanstackTableSetup";
import SearchTeam from "./SearchTeam";
import TableFooter from "./TableFooter";
import TeamTableBody from "./TeamTableBody";
import TeamsTableHead from "./TeamsTableHead";

const { columns, fuzzyFilter } = tableSettings;
export default function TeamMembers({ team }: { team: Team[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  const [data, setData] = useState(team);
  const queryClient = useQueryClient();
  const deleteTeam = useMutation({
    mutationFn: async ({
      rowIndex,
      teamID,
    }: {
      rowIndex: number;
      teamID: Schema["Team"]["deleteType"];
    }) => {
      const prev = data;
      setData((old) => old.filter((_, index) => index !== rowIndex));
      try {
        const response = await client.models.Team.delete(teamID);
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
      } catch (error) {
        setData(prev);
        throw error;
      }
      return teamID;
    },
    onError: (error) => {
      toast.error("Error updating teams: " + error.message);
    },
    onSuccess: (teamID) => {
      queryClient.invalidateQueries({ queryKey: ["Teams"] });
      toast.success(`Team ${teamID.id} deleted succesfully`);
    },
  });
  const updateTeam = useMutation({
    mutationFn: async (updatedData: Schema["Team"]["updateType"]) => {
      try {
        const response = await client.models.Team.update(updatedData);
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Teams"] });
      toast.success("Table data updated succesfully");
    },
    onError: () => {
      toast.error("Error updating teams");
    },
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: data,
    onGlobalFilterChange: setGlobalFilter,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    state: {
      pagination,
      globalFilter,
    },
    autoResetPageIndex: false,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index !== rowIndex) return row;
            return {
              ...old[rowIndex]!,
              [columnId]: value,
            };
          }),
        );
      },
      deleteTeam: (team, rowIndex) => {
        const teamID = {
          id: team.teamID,
        };
        deleteTeam.mutate({ teamID, rowIndex });
      },
      saveData: (team) => {
        const updatedData = {
          id: team.teamID,
          name: team.teamName,
          approved: team.approvedStatus,
        };
        updateTeam.mutate(updatedData);
      },
    },
  });
  return (
    <div className="flex flex-1 flex-col justify-between rounded-3xl bg-white p-2 text-xl outline  outline-awesomer-purple">
      <div>
        <SearchTeam
          tableDataLength={table.getRowCount()}
          handleSearchChange={useCallback(
            (value: string) => setGlobalFilter(value),
            [],
          )}
        />
        <table className="w-full border-separate border-spacing-x-0.5 p-2">
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
  );
}
