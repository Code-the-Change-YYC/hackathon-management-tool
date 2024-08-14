"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import type { Schema } from "@/amplify/data/resource";
import { useQuery } from "@tanstack/react-query";

import FilterIcon from "../atoms/FilterIcon";

const client = generateClient<Schema>();

type ITeamScores = {
  [teamId: string]: {
    total: number;
    name: string;
    components: {
      [x: string]: number;
    };
  };
};
type IScoreRaw = {
  teamId: string;
  teamName: string;
  score: {
    [x: string]: number;
  };
};

function TableRow({
  teamName = "Name",
  components = {},
  index = 0,
  total = 0,
}: {
  teamName?: string;
  components?: ITeamScores[string]["components"];
  index?: number;
  total?: number;
}) {
  const bgColor = index % 2 === 1 ? "bg-white" : "bg-gray-200";
  return (
    <tr className={twMerge("border-b", bgColor)}>
      <td className="truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {teamName}
      </td>
      {Object.keys(components).map((componentId) => {
        return (
          <td
            key={componentId}
            className="border-l-2 border-l-white px-6 py-4 text-black"
          >
            {components[componentId]}
          </td>
        );
      })}
      <td className="border-l-2 border-l-white px-6 py-4 text-black">
        {total}
      </td>
    </tr>
  );
}

export default function RankingTable() {
  // Load Data
  const { data: scoreData, isFetching: isScoreFetching } = useQuery({
    queryKey: ["Scores"],
    initialData: [],
    queryFn: async () => {
      const { data, errors } = await client.models.Score.list();
      if (errors) throw Error(errors[0].message);

      return data;
    },
  });

  const { data: hackathonData, isFetching: isHackathonFetching } = useQuery({
    queryKey: ["Hackathon"],
    initialData: {} as Schema["Hackathon"]["type"],
    queryFn: async () => {
      const { data, errors } = await client.models.Hackathon.list();
      if (errors) throw Error(errors[0].message);

      return data[0];
    },
  });

  // Do some local data reformatting
  const [formattedScores, setFormattedScores] = useState<IScoreRaw[]>([]);

  useEffect(() => {
    if (scoreData) {
      const decorateScoreData = async () => {
        const formattedData = await Promise.all(
          scoreData.map(async (score) => {
            return {
              teamId: score.teamId,
              teamName: (await score.team()).data?.name ?? "",
              score: JSON.parse(
                score.score as unknown as string,
              ) as IScoreRaw["score"],
            };
          }),
        );
        setFormattedScores(formattedData);
      };
      decorateScoreData();
    }
  }, [scoreData]);

  let computedScores: ITeamScores = {};
  console.log("Formatted Scores", formattedScores);

  computedScores = formattedScores.reduce((acc, score) => {
    if (!acc[score.teamId]) {
      acc[score.teamId] = {
        total: 0,
        name: score.teamName,
        components: {},
      };
    }

    const teamScore = [
      ...hackathonData.scoringComponents,
      ...hackathonData.scoringSidepots,
    ].reduce((total, component) => {
      const scoreComponentId = component?.id ?? "";
      acc[score.teamId].components[scoreComponentId] = acc[score.teamId]
        .components[scoreComponentId]
        ? Number(acc[score.teamId].components[scoreComponentId]) +
          Number(score.score[scoreComponentId])
        : score.score[scoreComponentId];

      return total + Number(score.score[scoreComponentId]);
    }, 0);

    acc[score.teamId].total += teamScore;

    return acc;
  }, computedScores);

  const [sortKey, setSortKey] = useState<string>("total");
  const [sortAscending, setSortAscending] = useState(true);

  function sortByKey(key: string, direction: boolean) {
    return Object.keys(computedScores).sort((a, b) => {
      const teamA =
        key === "total"
          ? computedScores[a].total
          : computedScores[a].components[key];
      const teamB =
        key === "total"
          ? computedScores[b].total
          : computedScores[b].components[key];

      if (teamA < teamB) {
        return direction ? -1 : 1;
      }
      if (teamA > teamB) {
        return direction ? 1 : -1;
      }
      return 0;
    });
  }
  const sortedTeamIds = useMemo(
    () => sortByKey(sortKey, sortAscending),
    [sortKey, sortAscending],
  );
  console.log("Sorted Team Ids", computedScores);
  return (
    !isScoreFetching &&
    !isHackathonFetching && (
      <div className="flex size-full justify-start overflow-auto rounded-xl">
        <table className=" w-full text-left text-lg font-medium text-gray-500">
          <thead className=" rounded-xl bg-awesome-purple text-lg  font-medium text-white">
            <tr>
              <th className=" px-6 py-3">
                <div className="flex items-center capitalize">Team</div>
              </th>
              {[
                ...hackathonData.scoringComponents,
                ...hackathonData.scoringSidepots,
              ].map((component) => {
                return (
                  <th key={component.id} className=" px-6 py-3">
                    <div className="flex items-center capitalize">
                      {component.friendlyName}
                      {component.isSidepot ? " (Sidepot)" : null}
                      <button
                        onClick={() => {
                          setSortKey(component.id);
                          setSortAscending(!sortAscending);
                        }}
                      >
                        <FilterIcon />
                      </button>
                    </div>
                  </th>
                );
              })}
              <th className=" px-6 py-3">
                <div className="flex items-center capitalize">
                  Total
                  <button
                    onClick={() => {
                      setSortKey("total");
                      setSortAscending(!sortAscending);
                    }}
                  >
                    <FilterIcon />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTeamIds.map((teamId, index) => {
              return (
                <TableRow
                  teamName={computedScores[teamId].name}
                  components={computedScores[teamId].components}
                  total={computedScores[teamId].total}
                  key={index}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
}
