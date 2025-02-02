"use client";

import { useState } from "react";
import React from "react";

import { generateScoreColumns } from "@/app/admin/components/ScoresTableSetup";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";

import type { TeamScore } from "../Dashboard/TeamRankings";

interface FuzzyFilterMeta {
  itemRank: {
    passed: boolean;
    rank: number;
    keyIndex: number;
    keyThreshold: number;
    threshold: number;
  };
}

interface FuzzyFilterFn {
  (
    row: any,
    columnId: string,
    value: TeamScore,
    addMeta: (meta: FuzzyFilterMeta) => void,
  ): { fuzzy: boolean };
}

const fuzzyFilter: Record<"fuzzy", FuzzyFilterFn> = {
  fuzzy: (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value.toString());
    addMeta({
      itemRank,
    });
    return { fuzzy: itemRank.passed };
  },
};
export default function RankingTableCopy({ scores }: { scores: TeamScore[] }) {
  console.log(scores);
  const [data] = useState(scores);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = generateScoreColumns(...data);
  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    state: {
      sorting,
    },
    filterFns: fuzzyFilter,
    sortingFns: {
      myCustomSortingFn: (rowA, rowB, columnId) => {
        return rowA.original[columnId] > rowB.original[columnId]
          ? 1
          : rowA.original[columnId] < rowB.original[columnId]
            ? -1
            : 0;
      },
    },
  });
  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
