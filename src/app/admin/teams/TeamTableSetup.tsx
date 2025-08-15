import { useState } from "react";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { createColumnHelper } from "@tanstack/react-table";
import DeleteButton from "./components/DeleteButton";
import SaveEditButton from "./components/SaveEditButton";
import type { Team } from "./components/TeamsTablePage";
import ViewButton from "./components/ViewButton";

const columnHelper = createColumnHelper<Team>();
export const teamColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "Team ID",
    sortingFn: "basic",
  }),
  columnHelper.accessor("name", {
    cell: ({
      getValue,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const [value, setValue] = useState(getValue());
      if (!getIsSelected()) return getValue();
      const onBlur = () => meta?.updateData(index, "name", value);
      return (
        <input
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          value={value}
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
  columnHelper.accessor("approved", {
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
      if (!getIsSelected()) return getValue() ? "Approved" : "Not Approved";
      const ApproveStatus = {
        Approved: true,
        "Not Approved": false,
      } as const;
      const onBlur = () => meta?.updateData(index, "approved", value);
      return (
        <select
          value={value ? "Approved" : "Not Approved"}
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          onChange={(e) => {
            setValue(
              ApproveStatus[e.target.value as keyof typeof ApproveStatus],
            );
            meta?.updateData(row.index, "approved", value);
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
          <DeleteButton
            row={row}
            meta={meta}
            headerText={
              <>
                <div>{row.original.name}</div>
                <div className="text-lg">{row.original.id}</div>
              </>
            }
          />
        </div>
      );
    },
    header: () => (
      <div className="flex items-center justify-center ">
        <TbInfoSquareRoundedFilled
          title={"shift+click headers to multi-sort"}
        />
      </div>
    ),
  }),
];
