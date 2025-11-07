"use client";

import React from "react";
import { client } from "@/app/QueryProvider";
import { useUser } from "@/components/contexts/UserContext";
import KevinLoadingRing from "@/components/KevinLoadingRing";
import { useQuery } from "@tanstack/react-query";

const AssignedTeamsPage = () => {
  const { currentUser } = useUser();

  const { data: roomData, isLoading: roomLoading } = useQuery({
    queryKey: ["RoomForJudge", currentUser?.JUDGE_roomId],
    queryFn: async () => {
      if (!currentUser?.JUDGE_roomId)
        throw new Error("No room assigned to judge");
      const { data, errors } = await client.models.Room.get({
        id: currentUser.JUDGE_roomId,
      });
      if (errors) throw new Error(errors[0]?.message || "Failed to load room");
      return data;
    },
    enabled: !!currentUser?.JUDGE_roomId,
  });

  const { data: teamsForRoom, isLoading: teamsLoading } = useQuery({
    queryKey: ["TeamsForRoom", roomData?.id],
    queryFn: async () => {
      if (!roomData) return [];
      const teamRooms = (await roomData.teamRoom())?.data;
      if (!teamRooms) return [];
      const teams = await Promise.all(
        teamRooms.map(async (tr) => (await tr.team()).data),
      );
      return teams;
    },
    enabled: !!roomData,
  });

  if (!currentUser)
    return <div className="p-6">Please sign in to see assigned teams.</div>;
  if (roomLoading || teamsLoading)
    return (
      <div className="flex items-center justify-center pt-16">
        <KevinLoadingRing />
      </div>
    );
  if (!roomData)
    return <div className="p-6">You have no room assigned yet.</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">
        Your Teams: {roomData?.name ?? ""}
      </h1>
      {teamsForRoom && teamsForRoom.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamsForRoom.map((team: any) => (
            <div
              key={team.id}
              className="flex flex-col justify-between rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div>
                <div className="text-lg font-bold text-gray-900">
                  <span>{team.name}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <span>Team ID: {team.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600">
          No teams assigned to your room yet. Check back later!
        </div>
      )}
    </div>
  );
};

export default AssignedTeamsPage;
