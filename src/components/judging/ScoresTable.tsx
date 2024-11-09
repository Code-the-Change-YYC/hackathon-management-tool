import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { type Schema } from "@/amplify/data/resource";
import { useQuery } from "@tanstack/react-query";

import Card from "../Dashboard/Card";
import { useUser } from "../contexts/UserContext";
import { type ScoreObject } from "./ModalPopup";

const edit_icon = "/svgs/judging/edit_icon.svg";
const filter_icon = "/svgs/judging/filter_arrows.svg";

const JUDGE_TABLE_CELL_STYLES = "text-center text-lg py-4";
const SCORE_BUTTON_STYLES =
  "rounded-full border-2 px-2 py-1 text-sm font-medium";

const PAGINATION_BUTTON_STYLES = "text-white rounded-full pb-1 px-6 mr-2";

const COLOR_SCHEMES = {
  pink: {
    headerCellBg: "bg-dark-pink",
    scoreButtonStyles: "border-white bg-medium-pink text-white",
    paginationButtonStyles: "bg-dark-pink hover:bg-pastel-pink",
  },
  purple: {
    headerCellBg: "bg-awesomer-purple",
    scoreButtonStyles: "border-white bg-awesome-purple text-white",
    paginationButtonStyles: "bg-awesomer-purple hover:bg-awesome-purple",
  },
};

const client = generateClient<Schema>();

interface JudgingTableProps {
  tableData: Schema["Team"]["type"][];
  onCreateScoreClick: (teamName: string) => void;
  onEditScoreClick: (teamName: string) => void;
  colorScheme: "pink" | "purple";
  entriesPerPage: number;
  hackathonData: Pick<
    Schema["Hackathon"]["type"],
    "scoringComponents" | "scoringSidepots"
  >;
}

export default function JudgingTable(props: JudgingTableProps) {
  const { currentUser } = useUser();

  const {
    tableData,
    onCreateScoreClick,
    onEditScoreClick,
    colorScheme,
    entriesPerPage,
    hackathonData,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState(tableData);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const entries_per_page = entriesPerPage;

  const tableHeaders = [
    { columnHeader: "Team Name", className: "px-6 rounded-tl-lg" },
    ...hackathonData.scoringComponents.map((component) => ({
      columnHeader: component.friendlyName,
      className: "w-fit",
    })),
    ...hackathonData.scoringSidepots.map((component) => ({
      columnHeader: (
        <div className="flex flex-col">
          <p>Sidepot:</p>
          {component.friendlyName}
        </div>
      ),
      className: "w-fit bg-pastel-pink",
    })),
  ];
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(tableData.length / entries_per_page)),
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //sorts team names (first index of data)
  const handleSortClick = () => {
    const sorted = tableData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortDirection === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setSortedData(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * entries_per_page;
  const paginatedData = sortedData.slice(
    startIndex,
    startIndex + entries_per_page,
  );

  const colorStyles = COLOR_SCHEMES[colorScheme];

  return (
    <Card className="items-start gap-3">
      <div className="w-full overflow-auto">
        <table className="w-full border-separate border-spacing-x-0.5">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={twMerge(
                    "p-4 text-xl font-medium capitalize text-white",
                    header.className,
                    colorStyles.headerCellBg,
                  )}
                >
                  {header.columnHeader}
                </th>
              ))}
              <th
                className={` rounded-tr-lg p-12 ${colorStyles.headerCellBg}`}
              />
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((team, rowIndex) => {
              const { data: scoreData } = useQuery({
                queryKey: ["Score", currentUser.username, team.id],
                queryFn: async () => {
                  try {
                    const { data, errors } = await client.models.Score.get({
                      judgeId: currentUser.username,
                      teamId: team.id,
                    });
                    if (errors) throw Error(errors[0].message);
                    return data;
                  } catch (error) {
                    console.error(error);
                  }
                },
              });

              const scoreObject = (
                scoreData?.score ? JSON.parse(scoreData?.score as string) : {}
              ) as ScoreObject;

              return (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-[#f1f1f1]" : "bg-[#e1e1e1]"
                  }`}
                >
                  <td className={JUDGE_TABLE_CELL_STYLES}>{team.name}</td>
                  {scoreData &&
                    Object.keys(scoreObject).map((cell, cellIndex) => (
                      <td key={cellIndex} className={JUDGE_TABLE_CELL_STYLES}>
                        {scoreObject[cell]}
                      </td>
                    ))}
                  <td className={JUDGE_TABLE_CELL_STYLES}>
                    {scoreData ? (
                      <button
                        className={`${SCORE_BUTTON_STYLES} ${colorStyles.scoreButtonStyles}`}
                        onClick={() => onEditScoreClick(team.id)}
                      >
                        <div className="flex">
                          <Image
                            src={edit_icon}
                            height={10}
                            width={10}
                            alt="Edit score icon"
                            className="mr-2"
                          />
                          <p>Edit Score</p>
                        </div>
                      </button>
                    ) : (
                      <button
                        className={`${SCORE_BUTTON_STYLES} ${colorStyles.scoreButtonStyles}`}
                        onClick={() => onCreateScoreClick(team.id)}
                      >
                        + Create Score
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-between">
        <button className="flex items-center gap-2" onClick={handleSortClick}>
          <Image src={filter_icon} height={20} width={20} alt="Filter icon" />
          <p>
            Sort{" "}
            {sortDirection === "asc"
              ? "Alphabetically"
              : "Reverse Alphabetically"}
          </p>
        </button>
        <div>
          <button
            className={`${PAGINATION_BUTTON_STYLES} ${colorStyles.paginationButtonStyles}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className={`${PAGINATION_BUTTON_STYLES} ${colorStyles.paginationButtonStyles}`}
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(sortedData.length / entries_per_page)
            }
          >
            &gt;
          </button>
        </div>
      </div>
    </Card>
  );
}
