"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { type Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import tanstackTableHelper from "@/components/TanstackTableHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import SearchTeam from "../teams/components/SearchTeam";
import TanstackTableBody from "../teams/components/TanstackTableBody";
import TableFooter from "../teams/components/TanstackTableFooter";
import TanstackTableHead from "../teams/components/TanstackTableHead";
import { type User, usersColumns } from "./UsersTableSetup";

export default function UsersTable({ users }: { users: User[] }) {
  const [data, setData] = useState(users);
  const [globalFilter, setGlobalFilter] = useState("");
  const queryClient = useQueryClient();
  const deleteParticipant = useMutation({
    mutationFn: async ({
      rowIndex,
      participantID,
    }: {
      rowIndex: number;
      participantID: Schema["User"]["deleteType"];
    }) => {
      const prev = data;
      setData((old) => old.filter((_, index) => index !== rowIndex));
      try {
        const response = await client.models.User.delete(participantID);
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
      } catch (error) {
        setData(prev);
        throw error;
      }
      return participantID;
    },
    onError: (error) => {
      toast.error("Error updating teams: " + error.message);
    },
    onSuccess: (teamID) => {
      queryClient.invalidateQueries({ queryKey: ["Teams"] });
      toast.success(`Team ${teamID.id} deleted succesfully`);
    },
  });
  const updateParticipant = useMutation({
    mutationFn: async (updatedData: Schema["User"]["updateType"]) => {
      try {
        const response = await client.models.User.update(updatedData);
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Participant"] });
      toast.success("Table data updated succesfully");
    },
    onError: () => {
      toast.error("Error updating participant");
    },
  });
  const table = tanstackTableHelper({
    data,
    columnData: usersColumns,
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
      deleteData: (participant, rowIndex) => {
        const participantID = {
          id: participant.id,
        };
        deleteParticipant.mutate({ participantID, rowIndex });
      },
      saveData: (participant) => {
        const updatedData = {
          id: participant.id,
          name: participant.firstName,
          lastName: participant.lastName,
          role: participant.role,
          teamId: participant.teamId,
          email: participant.email,
        };
        updateParticipant.mutate(updatedData);
      },
    },
    globalFilter,
    setGlobalFilter,
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
