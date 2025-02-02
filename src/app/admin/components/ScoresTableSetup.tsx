"use client";

import type { TeamScore } from "@/components/Dashboard/TeamRankings";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper, sortingFns } from "@tanstack/react-table";

const columnHelper = createColumnHelper<TeamScore>();
export function generateScoreColumns(...scores: TeamScore[]) {
  const myScore = scores[0].score;
  let columns: ColumnDef<TeamScore, unknown>[] = Object.entries(myScore).map(
    ([key, value]) => {
      return columnHelper.display({
        id: value.friendlyName,
        header: value.friendlyName,
        sortingFn: sortingFns.basic,
        cell: (info) => scores[info.row.index].score[key].amount,
      });
    },
  );
  columns = [
    columnHelper.display({
      id: "teamName",
      header: "Team Name",
      cell: (info) => info.row.original.team?.name ?? "No Name",
      sortingFn: sortingFns.basic,
      enableSorting: true,
      sortDescFirst: false,
    }),
    ...columns,
    {
      accessorKey: "Total",
      cell: (info) =>
        Object.values(scores[info.row.index].score).reduce(
          (acc, { amount }) => acc + parseFloat(amount),
          0,
        ),
      invertSorting: true,
    },
  ];
  return columns;
}
