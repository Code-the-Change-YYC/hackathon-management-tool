import { generateClient } from "aws-amplify/data";
import Image from "next/image";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { useUser } from "@/components/contexts/UserContext";
import JudgingTable from "@/components/judging/JudgingTable";
import ModalPopup from "@/components/judging/ModalPopup";
import StatsPanel from "@/components/judging/StatsPanel";
import { useQuery } from "@tanstack/react-query";

const pink_underlines = "/svgs/judging/pink_underline.svg";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-pastel-pink";

const JUDGE_DASHBOARD_PAGE_STYLES = "flex justify-center text-blackish";
const JUDGE_DASHBOARD_CONTENT_STYLES = "w-full max-w-[1500px] p-6";

const JUDGE_DASHBOARD_HELLO_TILE_STYLES =
  "mb-6 flex rounded-lg bg-white p-8 pb-6 text-4xl font-semibold drop-shadow-md";

const SUBHEADER_TEXT_STYLES = "mb-4 text-xl font-semibold";

const client = generateClient<Schema>();

const JudgingDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [tableData, setTableData] = useState<string[][]>([]);
  const [tableHeaders, setTableHeaders] = useState<
    { columnHeader: string; className: string }[]
  >([]);
  const [panelData, setPanelData] = useState<
    Array<{ icon: string; alt: string; stat: number; text: string }>
  >([
    {
      icon: "/svgs/judging/team_icon.svg",
      alt: "Teams assigned icon",
      stat: 0,
      text: "Loading...",
    },
    {
      icon: "/svgs/judging/teams_left.svg",
      alt: "Teams left icon",
      stat: 0,
      text: "Teams Left To Score",
    },
  ]);

  const fetchJudgeData = async (userId: string) => {
    try {
      const userResponse = await client.models.User.get({ id: userId });
      const userData = userResponse.data;
      if (!userData) throw new Error("User data not found");

      const judgeRoomId = userData.JUDGE_roomId;
      if (!judgeRoomId) throw new Error("Judge room ID not found");

      const roomResponse = await client.models.Room.get({ id: judgeRoomId });
      const roomData = roomResponse.data;
      if (!roomData) throw new Error("Room data not found");

      const hackathonResponse = await client.models.Hackathon.get({
        id: "123",
      });
      const hackathonData = hackathonResponse.data;
      if (!hackathonData) throw new Error("Hackathon data not found");

      const teamRoomResponse = await roomData.teamRoom();
      const teamRoomData = teamRoomResponse.data;
      if (!teamRoomData || teamRoomData.length === 0)
        throw new Error("Team room data not found or empty");

      const teams = await Promise.all(
        teamRoomData.map(async (teamRoom: any) => {
          const teamResponse = await client.models.Team.get({
            id: teamRoom.teamId,
          });
          const teamData = teamResponse.data;
          if (!teamData)
            throw new Error(
              `Team data not found for teamId: ${teamRoom.teamId}`,
            );

          const scoresResponse = await teamData.scores();
          const scoresData = scoresResponse.data;

          return {
            id: teamData.id,
            name: teamData.name,
            scores: scoresData || [],
            scored: scoresData && scoresData.length > 0,
          };
        }),
      );

      return {
        room: roomData,
        teams,
        scoringComponents: hackathonData.scoringComponents || [],
      };
    } catch (error) {
      console.error("Error fetching judge data:", error);
      throw error;
    }
  };

  const { currentUser } = useUser();
  const userId = currentUser.username;

  const { data, isFetching } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["JudgeData"],
    queryFn: () => fetchJudgeData(userId),
  });

  useEffect(() => {
    if (data) {
      const updatedTableHeaders = [
        { columnHeader: "Team Name", className: "w-1/3 rounded-tl-lg" },
        ...(data.scoringComponents ?? []).map((component: any) => ({
          columnHeader: component?.friendlyName ?? "N/A",
          className: "w-1/7",
        })),
      ];

      const updatedTableData = data.teams.map((team: any) => {
        const parsedScores =
          team.scores.length > 0
            ? team.scores.flatMap((scoreData: any) => {
                try {
                  const parsedScore = JSON.parse(scoreData.score);
                  return Object.values(parsedScore);
                } catch (error) {
                  console.error("Error parsing score JSON:", error);
                  return Array(data.scoringComponents.length).fill(
                    "Invalid Score",
                  );
                }
              })
            : Array(data.scoringComponents.length).fill("N/A");

        return [team.name, ...parsedScores, team.scores.length > 0];
      });

      setTableHeaders(updatedTableHeaders);
      setTableData(updatedTableData);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const updatedPanelData = [
        {
          icon: "/svgs/judging/team_icon.svg",
          alt: "Teams assigned icon",
          stat: data.teams.length,
          text: `Teams Assigned to Room ${data.room.name}`,
        },
        {
          icon: "/svgs/judging/teams_left.svg",
          alt: "Teams left icon",
          stat: data.teams.filter((team: any) => team.scores.length === 0)
            .length,
          text: "Teams Left To Score",
        },
      ];

      setPanelData(updatedPanelData);
    }
  }, [data]);

  const handleCreateScoreClick = (teamName: string) => {
    setSelectedTeamName(teamName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isFetching ? (
        <div className={LOADING_SCREEN_STYLES}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={JUDGE_DASHBOARD_PAGE_STYLES}>
          <div className={JUDGE_DASHBOARD_CONTENT_STYLES}>
            <div className={JUDGE_DASHBOARD_HELLO_TILE_STYLES}>
              <h1>Hello,</h1>
              <div className="ml-2">
                <h1 className="text-dark-pink">
                  <i>Judge!</i>
                </h1>
                <div className="mt-2 flex justify-center">
                  <Image
                    src={pink_underlines}
                    height={100}
                    width={80}
                    alt="Pink underlines"
                  />
                </div>
              </div>
            </div>
            <h2 className={SUBHEADER_TEXT_STYLES}>Assigned Teams</h2>
            <div className="flex">
              <div className="mr-4 flex w-1/4 flex-col space-y-4">
                {panelData.map((item, index) => (
                  <div key={index} className="h-1/2">
                    <StatsPanel
                      icon={item.icon}
                      alt={item.alt}
                      stat={item.stat}
                      subheader={item.text}
                    />
                  </div>
                ))}
              </div>
              <div className="w-3/4">
                <JudgingTable
                  tableHeaders={tableHeaders}
                  tableData={tableData}
                  onCreateScoreClick={handleCreateScoreClick}
                />
              </div>
            </div>
          </div>
          <ModalPopup
            isOpen={isModalOpen}
            onClose={closeModal}
            teamName={selectedTeamName}
          />
        </div>
      )}
    </>
  );
};

export default JudgingDashboard;
