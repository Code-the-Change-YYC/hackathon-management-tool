import { generateClient } from "aws-amplify/data";
import Image from "next/image";
import { useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import LoadingRing from "@/components/LoadingRing";
import { useUser } from "@/components/contexts/UserContext";
import ModalPopup from "@/components/judging/ModalPopup";
import ScoresTable from "@/components/judging/ScoresTable";
import StatsPanel from "@/components/judging/StatsPanel";
import { useQuery } from "@tanstack/react-query";

const pink_underlines = "/svgs/judging/pink_underline.svg";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-pastel-pink";

const JUDGE_DASHBOARD_PAGE_STYLES =
  "flex justify-center text-blackish h-screen";
const JUDGE_DASHBOARD_CONTENT_STYLES = "w-full max-w-[1500px] p-6";

const JUDGE_DASHBOARD_HELLO_TILE_STYLES =
  "mb-6 flex rounded-lg bg-white p-8 pb-6 text-4xl font-semibold drop-shadow-md";

const SUBHEADER_TEXT_STYLES = "mb-4 text-xl font-semibold";

const client = generateClient<Schema>();

const JudgingDashboard = () => {
  const [selectedTeam, setSelectedTeamId] = useState("");

  const { currentUser } = useUser();

  const { data: roomData, isFetching: roomIsFetching } = useQuery({
    queryKey: ["Room"],
    queryFn: async () => {
      const { data, errors } = await client.models.Room.get({
        id: currentUser.JUDGE_roomId,
      });
      if (errors) throw Error(errors[0].message);

      return data;
    },
  });

  const { data: hackathonData, isFetching: hackathonIsFetching } = useQuery({
    queryKey: ["Hackathon"],
    queryFn: async () => {
      const { data, errors } = await client.models.Hackathon.list();
      if (errors) throw Error(errors[0].message);

      return data[0];
    },
  });

  const { data: teamsForRoomData, isFetching: teamsForRoomIsFetching } =
    useQuery({
      queryKey: ["TeamsForRoom"],
      queryFn: async () => {
        const teamRooms = (await roomData?.teamRoom())?.data;
        if (!teamRooms) return [];
        const teams = await Promise.all(
          teamRooms.map(async (teamRoom) => (await teamRoom.team()).data),
        );
        if (!teams) return [];

        return teams;
      },
    });

  if (!hackathonData || !teamsForRoomData || !roomData) return;

  const tableHeaders = [
    { columnHeader: "Team Name", className: "w-1/3 rounded-tl-lg" },
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

  const panelData = [
    {
      icon: "/svgs/judging/team_icon.svg",
      alt: "Teams assigned icon",
      stat: teamsForRoomData.length,
      text: `Teams Assigned to ${roomData.name}`,
    },
    {
      icon: "/svgs/judging/teams_left.svg",
      alt: "Teams left icon",
      stat: teamsForRoomData.filter(
        async (team) =>
          (await team?.scores())?.data.filter(
            (score) => score.judgeId === currentUser.username,
          ).length === 0,
      ).length,
      text: "Teams Left To Score",
    },
  ];

  const isFetching =
    roomIsFetching || hackathonIsFetching || teamsForRoomIsFetching;

  const handleCreateScoreClick = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const handleEditScoreClick = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const closeModal = () => {
    setSelectedTeamId("");
  };

  return (
    <>
      {isFetching ? (
        <div className={LOADING_SCREEN_STYLES}>
          <LoadingRing />
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
            <div className="mb-4 flex">
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
                <ScoresTable
                  tableHeaders={tableHeaders}
                  tableData={teamsForRoomData as Schema["Team"]["type"][]}
                  onCreateScoreClick={handleCreateScoreClick}
                  onEditScoreClick={handleEditScoreClick}
                  colorScheme="pink"
                  entriesPerPage={5}
                />
              </div>
            </div>
          </div>
          {selectedTeam !== "" && (
            <ModalPopup
              hackathon={hackathonData}
              onClose={closeModal}
              teamId={selectedTeam}
            />
          )}
        </div>
      )}
    </>
  );
};

export default JudgingDashboard;
