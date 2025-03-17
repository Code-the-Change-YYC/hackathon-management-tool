"use client";

import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import JudgingTimeline from "@/components/admin/Judging/JudgingTimeline";
import { useQuery } from "@tanstack/react-query";

const client = generateClient<Schema>();

export default function JudgingSchedule() {
  const { data: roomData, isLoading: isLoadingRooms } = useQuery({
    queryKey: ["Room"],
    queryFn: async () => {
      const { data, errors } = await client.models.Room.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const { data: teamRoomData, isLoading: isLoadingTeamRooms } = useQuery({
    queryKey: ["TeamRoom"],
    queryFn: async () => {
      const { data, errors } = await client.models.TeamRoom.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const { data: judgeData, isLoading: isLoadingJudges } = useQuery({
    queryKey: ["User-Judge"],
    queryFn: async () => {
      const { data, errors } = await client.models.User.list({
        filter: {
          role: {
            eq: "Judge",
          },
        },
        selectionSet: ["id", "JUDGE_roomId", "firstName"],
      });
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const { data: teamData, isLoading: isLoadingTeams } = useQuery({
    queryKey: ["Teams"],
    queryFn: async () => {
      const { data, errors } = await client.models.Team.list({
        selectionSet: ["id", "name"],
      });
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const isLoading =
    isLoadingRooms || isLoadingJudges || isLoadingTeamRooms || isLoadingTeams;

  const judgeRooms =
    roomData && judgeData
      ? roomData
          .map((room) => ({
            roomName: room.name,
            room_id: room.id,
            judgeNames:
              judgeData
                ?.filter((judge) => judge.JUDGE_roomId === room.id)
                .map((judge) => judge.firstName)
                .join(" & ") || "No Names",
            color: "#D6C9FF",
          }))
          .sort((a, b) =>
            a.roomName > b.roomName ? 1 : b.roomName > a.roomName ? -1 : 0,
          )
      : [];

  const judgingEvents =
    teamRoomData && teamData
      ? teamRoomData.map((teamRoom) => ({
          event_id: teamRoom.id,
          title:
            teamData
              ?.filter((team) => team.id === teamRoom.teamId)
              .map((team) => team.name)
              .join(", ") || "No Team Name",
          room_id: teamRoom.roomId,
          start: new Date(teamRoom.time),
          end: new Date(new Date(teamRoom.time).getTime() + 15 * 60 * 1000),
          zoomLink: teamRoom.zoomLink,
        }))
      : [];

  // State to manage the filter (all teams or assigned teams)
  const [filter, setFilter] = useState<"all" | "assigned">("all");

  // Filtered events based on the selected filter
  const filteredEvents =
    filter === "all"
      ? judgingEvents
      : judgingEvents.filter((event) =>
          judgeData?.some((judge) => judge.JUDGE_roomId === event.room_id),
        );

  return isLoading ? (
    <div>Loading schedule...</div>
  ) : (
    <div className="mt-8 flex flex-col items-center">
      {/* Filter Buttons */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded px-4 py-2 ${
            filter === "all" ? "bg-awesomer-purple text-white" : "bg-gray-200"
          }`}
        >
          All Teams
        </button>
        <button
          onClick={() => setFilter("assigned")}
          className={`rounded px-4 py-2 ${
            filter === "assigned"
              ? "bg-awesomer-purple text-white"
              : "bg-gray-200"
          }`}
        >
          Assigned Teams
        </button>
      </div>

      {/* Schedule Display */}
      <div className="w-full max-w-[1000px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
        {filteredEvents.length > 0 ? (
          <JudgingTimeline
            judgeRooms={judgeRooms}
            judgingEvents={filteredEvents}
          />
        ) : (
          <div className="flex justify-center">Schedule not made yet</div>
        )}
      </div>
    </div>
  );
}
