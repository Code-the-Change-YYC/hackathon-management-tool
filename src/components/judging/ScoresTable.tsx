import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { type Schema } from "@/amplify/data/resource";
import { useQuery } from "@tanstack/react-query";

import Card from "../Dashboard/Card";
import { useUser } from "../contexts/UserContext";
import { type ScoreObject } from "./ModalPopup";

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

  // editing scores

  const [editScore, setEditScore] = useState<{
    teamId: string;
    columnId: string;
  } | null>(null);
  const { register, handleSubmit, setValue } = useForm();

  const handleEditClick = (
    teamId: string,
    columnId: string,
    currentValue: string,
  ) => {
    setEditScore({ teamId, columnId });
    setValue(`score.${columnId}`, currentValue);
  };

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
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((team, rowIndex) => {
              const { data: scoreData, refetch } = useQuery({
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

              const scoringComponentIds = useMemo(
                () =>
                  hackathonData.scoringComponents.map(
                    (component) => component.id,
                  ),
                [hackathonData.scoringComponents],
              );

              const sidePotIds = useMemo(
                () =>
                  hackathonData.scoringSidepots.map(
                    (component) => component.id,
                  ),
                [hackathonData.scoringSidepots],
              );

              const tableIds = useMemo(
                () => [...scoringComponentIds, ...sidePotIds],
                [scoringComponentIds, sidePotIds],
              );

              // editing logic

              const handleSave = async (
                data: any,
                teamId: string,
                columnId: string,
              ) => {
                try {
                  await client.models.Score.update({
                    judgeId: currentUser.username,
                    teamId,
                    score: JSON.stringify({
                      ...scoreObject,
                      [columnId]: data[`score`][columnId],
                    }),
                  });
                  await refetch();

                  setEditScore(null);
                } catch (error) {
                  console.error("Error updating score:", error);
                }
              };

              return (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-[#f1f1f1]" : "bg-[#e1e1e1]"
                  }`}
                >
                  <td className={JUDGE_TABLE_CELL_STYLES}>{team.name}</td>
                  {scoreData &&
                    tableIds.map((columnId, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={JUDGE_TABLE_CELL_STYLES}
                        onClick={() =>
                          handleEditClick(
                            team.id,
                            columnId,
                            scoreObject[columnId],
                          )
                        }
                      >
                        {editScore?.teamId === team.id &&
                        editScore?.columnId === columnId ? (
                          <form
                            onSubmit={handleSubmit((data) =>
                              handleSave(data, team.id, columnId),
                            )}
                          >
                            <select
                              {...register(`score.${columnId}`)}
                              defaultValue={scoreObject[columnId] || " "}
                              className="w-16 rounded p-1"
                              autoFocus
                              onChange={async (e) => {
                                const newValue = e.target.value;
                                setValue(`score.${columnId}`, newValue);

                                await handleSave(
                                  { score: { [columnId]: newValue } },
                                  team.id,
                                  columnId,
                                );
                              }}
                            >
                              {[
                                "0",
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                              ].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </form>
                        ) : (
                          scoreObject[columnId]
                        )}
                      </td>
                    ))}

                  {!scoreData && (
                    <td className={JUDGE_TABLE_CELL_STYLES}>
                      <button
                        className={`${SCORE_BUTTON_STYLES} ${colorStyles.scoreButtonStyles}`}
                        onClick={() => onCreateScoreClick(team.id)}
                      >
                        + Create Score
                      </button>
                    </td>
                  )}
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
