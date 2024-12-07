import { useEffect, useState } from "react";

import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn, RowData } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import DeleteButton from "./components/DeleteButton";
import SaveEditButton from "./components/SaveEditButton";
import ViewButton from "./components/ViewButton";

export type Team = {
  teamName: string;
  approvedStatus: boolean | null;
  teamID: string;
  members: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    checkedIn: boolean | null;
  }[];
};
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: keyof TData,
      value: TData[keyof TData],
    ) => void;
    saveData: (team: TData) => void;
    deleteTeam: (team: TData, rowIndex: number) => void;
  }
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const columnHelper = createColumnHelper<Team>();
const columns = [
  columnHelper.accessor("teamID", {
    cell: (info) => info.getValue(),
    header: "Team ID",
    sortingFn: "basic",
  }),
  columnHelper.accessor("teamName", {
    cell: ({
      getValue,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const initialValue = getValue() as string;
      const [value, setValue] = useState(initialValue);
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      if (!getIsSelected()) {
        return getValue();
      }
      const onBlur = () => {
        meta?.updateData(index, "teamName", value);
      };
      return (
        <input
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
    header: (ctx) => {
      const canSort = ctx.column.getCanSort();
      return (
        <div
          onClick={ctx.header.column.getToggleSortingHandler()}
          className={`flex flex-col gap-2 xl:flex-row xl:items-center ${canSort && "cursor-pointer select-none"}`}
        >
          <div className="whitespace-nowrap">Team Name</div>
        </div>
      );
    },
    filterFn: "includesString",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("members", {
    cell: (info) =>
      info.getValue().every((member) => member.checkedIn)
        ? "Checked In"
        : "Not Checked In",
    header: "Check-in Status",
    sortingFn: "basic",
  }),
  columnHelper.accessor("approvedStatus", {
    cell: ({
      getValue,
      row,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      if (!getIsSelected()) {
        return getValue() ? "Approved" : "Not Approved";
      }
      const ApproveStatus = {
        Approved: true,
        "Not Approved": false,
      } as const;
      const onBlur = () => {
        meta?.updateData(index, "approvedStatus", value);
      };
      return (
        <select
          value={value ? "Approved" : "Not Approved"}
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          onChange={(e) => {
            setValue(
              ApproveStatus[e.target.value as keyof typeof ApproveStatus],
            );
            meta?.updateData(row.index, "approvedStatus", value);
          }}
          onBlur={onBlur}
        >
          {Object.keys(ApproveStatus).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      );
    },

    header: "Approved Status",
    sortingFn: "basic",
  }),
  columnHelper.display({
    id: "_ACTIONS",
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => {
      const team = row.original;
      return (
        <div className="grid auto-cols-auto grid-flow-col gap-2 ">
          <SaveEditButton row={row} meta={meta} />
          <ViewButton team={team} />
          <DeleteButton row={row} meta={meta} />
        </div>
      );
    },
  }),
];
// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const tableSettings = {
  columns,
  fuzzyFilter,
};
