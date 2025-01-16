"use client";

import { useState } from "react";

import type { Schema } from "@/amplify/data/resource";
import { createColumnHelper } from "@tanstack/react-table";

import DeleteButton from "../teams/components/DeleteButton";
import SaveEditButton from "../teams/components/SaveEditButton";

export type User = Pick<
  Schema["User"]["type"],
  "email" | "firstName" | "lastName" | "role" | "teamId" | "id"
>;

const Role = {
  Participant: "Participant",
  Judge: "Judge",
  Admin: "Admin",
} as const;
const columnHelper = createColumnHelper<User>();
export const usersColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID",
    sortingFn: "basic",
  }),
  columnHelper.accessor("email", {
    header: "Email",
    sortingFn: "basic",
  }),
  columnHelper.accessor("firstName", {
    cell: ({
      getValue,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const initialValue = getValue()!;
      const [value, setValue] = useState(initialValue);
      if (!getIsSelected()) {
        return getValue();
      }
      const onBlur = () => {
        meta?.updateData(index, "firstName", value);
      };
      return (
        <input
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
    header: "First Name",
    filterFn: "includesString",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("lastName", {
    cell: ({
      getValue,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const initialValue = getValue()!;
      const [value, setValue] = useState(initialValue);
      if (!getIsSelected()) {
        return getValue();
      }
      const onBlur = () => {
        meta?.updateData(index, "lastName", value);
      };
      return (
        <input
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
    header: "Last Name",
    filterFn: "includesString",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("role", {
    cell: ({
      getValue,
      row,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue ?? "");
      if (!getIsSelected()) {
        return getValue();
      }
      const onBlur = () => {
        meta?.updateData(index, "role", value);
      };
      return (
        <select
          value={value}
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          onChange={(e) => {
            setValue(Role[e.target.value as keyof typeof Role]);
            meta?.updateData(row.index, "role", value);
          }}
          onBlur={onBlur}
        >
          {Object.keys(Role).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      );
    },

    header: "Role",
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
      return (
        <div className="grid auto-cols-auto grid-flow-col gap-2 ">
          <SaveEditButton row={row} meta={meta} />
          <DeleteButton row={row} meta={meta} />
        </div>
      );
    },
  }),
];
