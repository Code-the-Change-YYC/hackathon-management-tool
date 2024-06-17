"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import Card from "./Card";
import FilterButton from "./FilterButton";

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
    <tr className={twMerge("border-b bg-white", bgColor)}>
      <th className="truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {teamName}
      </th>
      <td className="border-l-2 border-l-white px-6 py-4 text-black">
        {score}
      </td>
    </tr>
  );
}
function RankingTable() {
  interface Ranking {
    teamName: string;
    score: number;
  }
  const rankings: Ranking[] = [
    { teamName: "TeamA", score: 100 },
    { teamName: "TeamB", score: 50 },
    { teamName: "TeamC", score: 75 },
    { teamName: "TeamA", score: 100 },
    { teamName: "TeamB", score: 50 },
    { teamName: "TeamC", score: 75 },
    { teamName: "TeamA", score: 100 },
    { teamName: "TeamB", score: 50 },
    { teamName: "TeamC", score: 75 },
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
    <div className="w-full overflow-x-auto rounded-xl">
      <table className=" w-full text-left text-lg font-medium text-gray-500">
        <thead className=" rounded-xl bg-awesome-purple text-lg  font-medium text-white">
          <tr>
            {Object.keys(rankings[0]).map((key) => {
              return (
                <th key={key} className=" px-6 py-3">
                  <div className="flex items-center capitalize">
                    {key}
                    <FilterButton
                      onClick={() => {
                        setSortKey(key as keyof Ranking);
                        setSortAscending(!sortAscending);
                      }}
                    />
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
export default function TeamRankings() {
  return (
    <Card>
      <div className="flex w-full flex-row items-center justify-between">
        <div className=" font-medium">View Team Rankings</div>
        <Image
          src={"/images/admin/RightArrow.png"}
          alt={"arrow"}
          width={60}
          height={60}
        />
      </div>
      <RankingTable />
    </Card>
  );
}
