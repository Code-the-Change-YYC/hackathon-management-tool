"use client";

import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { createColumnHelper } from "@tanstack/react-table";
import DeleteButton from "../teams/components/DeleteButton";
import SaveEditButton from "../teams/components/SaveEditButton";
import type { User } from "../users/UserTablePage";

const Role = {
  Participant: "Participant",
  Judge: "Judge",
  Admin: "Admin",
} as const;
const columnHelper = createColumnHelper<User>();
export const usersColumns = [
  columnHelper.accessor("id", {
    cell: (info) => {
      return (
        <div className="max-w-24 overflow-x-auto whitespace-nowrap lg:max-w-48 2xl:max-w-full">
          {info.getValue()}
        </div>
      );
    },
    header: "ID",
    sortingFn: "basic",
  }),
  columnHelper.accessor("email", {
    cell: (info) => {
      return (
        <div className="max-w-24 overflow-x-auto whitespace-nowrap lg:max-w-48 2xl:max-w-full">
          {info.getValue()}
        </div>
      );
    },
    header: "Email",
    sortingFn: "basic",
  }),
  columnHelper.accessor("teamId", {
    cell: ({
      getValue,
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const [value, setValue] = useState(getValue()!);
      const debouncedUpdate = useMemo(
        () =>
          debounce((newValue: string) => {
            meta?.updateData(index, "teamId", newValue);
          }, 300),
        [meta, index],
      );
      if (!getIsSelected()) return getValue();
      const onBlur = () => {
        meta?.updateData(index, "teamId", value);
      };
      return (
        <input
          className="w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            debouncedUpdate(e.target.value);
          }}
          onBlur={onBlur}
        />
      );
    },
    header: "Team ID",
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
      const debouncedUpdate = useMemo(
        () =>
          debounce((newValue: string) => {
            meta?.updateData(index, "firstName", newValue);
          }, 300),
        [meta, index],
      );
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
          onChange={(e) => {
            setValue(e.target.value);
            debouncedUpdate(e.target.value);
          }}
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
      const debouncedUpdate = useMemo(
        () =>
          debounce((newValue: string) => {
            meta?.updateData(index, "lastName", newValue);
          }, 300),
        [meta, index],
      );
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
          onChange={(e) => {
            setValue(e.target.value);
            debouncedUpdate(e.target.value);
          }}
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
      row: { getIsSelected, index },
      table: {
        options: { meta },
      },
    }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue ?? "");
      const debouncedUpdate = useMemo(
        () =>
          debounce((newValue: string) => {
            meta?.updateData(index, "role", newValue);
          }, 300),
        [meta, index],
      );
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
            debouncedUpdate(Role[e.target.value as keyof typeof Role]);
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
          <DeleteButton
            row={row}
            meta={meta}
            headerText={
              <>
                <div>
                  {`${row.original.firstName} ${row.original.lastName}`}
                </div>
                <div className="text-lg">{row.original.email}</div>
                <div className="text-xs">{row.original.id}</div>
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
