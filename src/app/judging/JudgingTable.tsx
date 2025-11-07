"use client";

import { useState } from "react";
import type { Schema } from "@/amplify/data/resource";
import { useUser } from "@/components/contexts/UserContext";
import ModalPopup from "@/components/judging/ModalPopup";
import ScoresTable from "@/components/judging/ScoresTable";
import StatsPanel from "@/components/judging/StatsPanel";
import KevinLoadingRing from "@/components/KevinLoadingRing";
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
  const [teamName, setTeamName] = useState("");

  const { currentUser } = useUser();
  const { data: roomData, isFetching: roomIsFetching } = useQuery({
    queryKey: ["RoomForJudge", currentUser.JUDGE_roomId],
    queryFn: async () => {
      if (!currentUser.JUDGE_roomId) throw Error("No room assigned to judge");
      const { data, errors } = await client.models.Room.get({
        id: currentUser.JUDGE_roomId,
      });
      if (errors) throw Error(errors[0].message);

      return data;
    },
    enabled: !!currentUser.JUDGE_roomId,
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

  const { data: teamsLeft = 0, isFetching: teamsLeftIsFetching } = useQuery({
    queryKey: [
      "TeamsLeftCount",
      teamsForRoomData,
      currentUser.username,
      teamsForRoomData?.map((t) => t?.id).join(","),
    ],
    queryFn: async () => {
      if (!teamsForRoomData) return 0;
      const boolArray = await Promise.all(
        teamsForRoomData.map(async (team) => {
          const scores = await team?.scores();
          return (
            scores?.data.filter(
              (score) => score.judgeId === currentUser.username,
            ).length === 0
          );
        }),
      );
      return teamsForRoomData.filter((_, i) => boolArray[i]).length;
    },
    enabled: !!teamsForRoomData?.length && !!currentUser.username,
  });

  const isFetching =
    roomIsFetching || teamsForRoomIsFetching || teamsLeftIsFetching;

  if (isFetching || !roomData || !teamsForRoomData) {
    return <KevinLoadingRing />;
  }

  const panelData = [
    {
      icon: "/svgs/judging/team_icon.svg",
      alt: "Teams assigned icon",
      stat: teamsForRoomData.length,
      text:
        teamsForRoomData.length === 1
          ? `Team Assigned to ${roomData.name}`
          : `Teams Assigned to ${roomData.name}`,
    },
    {
      icon: "/svgs/judging/teams_left.svg",
      alt: "Teams left icon",
      stat: teamsLeft,
      text: teamsLeft === 1 ? "Team Left to Score" : "Teams Left to Score",
    },
  ];

  const handleCreateScoreClick = (teamId: string) => {
    const selectedTeam = teamsForRoomData.find((team) => team?.id === teamId);

    if (selectedTeam) {
      setSelectedTeamId(teamId);
      setTeamName(selectedTeam.name);
    }
  };

  const closeModal = () => {
    setSelectedTeamId("");
    setTeamName("");
  };

  return (
    <>
      <div className="flex w-full flex-col justify-center gap-4 py-6 xl:flex-row">
        <div className="flex w-full flex-row gap-4 xl:w-1/4 xl:flex-col">
          {panelData.map((item, index) => (
            <StatsPanel
              key={index}
              icon={item.icon}
              alt={item.alt}
              stat={item.stat}
              subheader={item.text}
            />
          ))}
        </div>
        <ScoresTable
          tableData={teamsForRoomData as Schema["Team"]["type"][]}
          onCreateScoreClick={handleCreateScoreClick}
          colorScheme="pink"
          entriesPerPage={150}
          hackathonData={hackathonData}
        />
      </div>

      {selectedTeam !== "" && (
        <ModalPopup
          hackathon={hackathonData}
          onClose={closeModal}
          teamId={selectedTeam}
          teamName={teamName}
        />
      )}
    </>
  );
}
