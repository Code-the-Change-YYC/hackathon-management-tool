"use client";

import { useMemo, useState } from "react";

import type { Schema } from "@/amplify/data/resource";
import LoadingRing from "@/components/LoadingRing";
import { useUser } from "@/components/contexts/UserContext";
import ModalPopup from "@/components/judging/ModalPopup";
import ScoresTable from "@/components/judging/ScoresTable";
import StatsPanel from "@/components/judging/StatsPanel";
import { useQuery } from "@tanstack/react-query";

import { client } from "../QueryProvider";

export default function JudgingTable({
  hackathonData,
}: {
  hackathonData: Pick<
    Schema["Hackathon"]["type"],
    "id" | "scoringComponents" | "scoringSidepots"
  >;
}) {
  const [selectedTeam, setSelectedTeamId] = useState("");

  const { currentUser } = useUser();
  const { data: roomData, isFetching: roomIsFetching } = useQuery({
    queryKey: ["RoomForJudge", currentUser.JUDGE_roomId],
    queryFn: async () => {
      const { data, errors } = await client.models.Room.get({
        id: currentUser.JUDGE_roomId,
      });
      if (errors) throw Error(errors[0].message);

      return data;
    },
  });
  const { data: teamsForRoomData, isFetching: teamsForRoomIsFetching } =
    useQuery({
      queryKey: ["TeamsForRoom", roomData?.id],
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
  if (
    roomIsFetching ||
    teamsForRoomIsFetching ||
    !roomData ||
    !teamsForRoomData
  ) {
    return <div>Loading...</div>;
  }

  const panelData = useMemo(() => {
    return [
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
  }, [roomData, teamsForRoomData]);
  const handleCreateScoreClick = (teamId: string) => {
    setSelectedTeamId(teamId);
  };
  const handleEditScoreClick = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const closeModal = () => {
    setSelectedTeamId("");
  };

  const isFetching = roomIsFetching || teamsForRoomIsFetching;

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
  return isFetching ? (
    <div
      className={
        "flex h-screen w-full items-center justify-center bg-pastel-pink"
      }
    >
      <LoadingRing />
    </div>
  ) : (
    <div className={"flex h-screen justify-center text-blackish"}>
      <div className="mb-4 flex w-full max-w-[1500px] p-6">
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
            entriesPerPage={150}
          />
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
  );
}
