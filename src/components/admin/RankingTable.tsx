"use client";

import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import FilterIcon from "../atoms/FilterIcon";

function TableRow({
  teamName = "Name",
  score = 100,
  index = 0,
}: {
  teamName?: string;
  score?: number;
  index?: number;
}) {
  const bgColor = index % 2 === 1 ? "bg-white" : "bg-gray-200";
  return (
    <tr className={twMerge("border-b", bgColor)}>
      <th className="truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {teamName}
      </th>
      <td className="border-l-2 border-l-white px-6 py-4 text-black">
        {score}
      </td>
    </tr>
  );
}
export default function RankingTable() {
  interface Ranking {
    teamName: string;
    score: number;
  }
  const rankings: Ranking[] = [
    { teamName: "TeamA", score: 85 },
    { teamName: "TeamB", score: 72 },
    { teamName: "TeamC", score: 94 },
    { teamName: "TeamD", score: 68 },
    { teamName: "TeamE", score: 76 },
    { teamName: "TeamF", score: 88 },
    { teamName: "TeamG", score: 53 },
    { teamName: "TeamH", score: 95 },
    { teamName: "TeamI", score: 47 },
    { teamName: "TeamJ", score: 69 },
  ];

  const [sortKey, setSortKey] = useState<keyof Ranking>("teamName");
  const [sortAscending, setSortAscending] = useState(true);
  function sortByKey(key: keyof Ranking, direction: boolean) {
    return rankings.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction ? 1 : -1;
      }
      return 0;
    });
  }
  const sortedRankings = useMemo(
    () => sortByKey(sortKey, sortAscending),
    [sortKey, sortAscending],
  );
  return (
    <div className="max-h-[50vh] w-full overflow-auto rounded-xl">
      <table className=" w-full text-left text-lg font-medium text-gray-500">
        <thead className=" rounded-xl bg-awesome-purple text-lg  font-medium text-white">
          <tr>
            {Object.keys(rankings[0]).map((key) => {
              return (
                <th key={key} className=" px-6 py-3">
                  <div className="flex items-center capitalize">
                    {key}
                    <button
                      onClick={() => {
                        setSortKey(key as keyof Ranking);
                        setSortAscending(!sortAscending);
                      }}
                    >
                      <FilterIcon />
                    </button>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((ranking, index) => {
            return (
              <TableRow
                teamName={ranking.teamName}
                score={ranking.score}
                key={index}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
