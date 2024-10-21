"use client";

import { generateClient } from "aws-amplify/api";

import { type Schema } from "@/amplify/data/resource";
import JudgingTimeline from "@/components/admin/Judging/JudgingTimeline";
import RoomAssigner from "@/components/admin/Judging/RoomAssigner";
import { useMutation, useQuery } from "@tanstack/react-query";

const client = generateClient<Schema>();

export default function JudgingSchedule() {
  const { mutate } = useMutation({
    mutationFn: async ({
      judgingSessionsPerTeam,
      numOfJudgingRooms,
      startDateAndTime,
      presentationDuration,
    }: {
      judgingSessionsPerTeam: number;
      numOfJudgingRooms: number;
      startDateAndTime: string;
      presentationDuration: number;
    }) => {
      try {
        const response = await client.mutations.ScheduleTeamsAndJudges({
          judgingSessionsPerTeam,
          numOfJudgingRooms,
          startDateAndTime,
          presentationDuration,
        });

        if (response.errors) {
          throw new Error(response.errors[0].message);
        }

        if (response.data && response.data.body) {
          const responseBody =
            typeof response.data.body === "string"
              ? response.data.body
              : JSON.stringify(response.data.body);
          return JSON.parse(responseBody);
        } else {
          console.error("Response data or body is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching the judging schedule: ", error);
        throw error;
      }
    },
  });

  const { data: roomData } = useQuery({
    queryKey: ["Room"],
    queryFn: async () => {
      const { data, errors } = await client.models.Room.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const { data: teamRoomData } = useQuery({
    queryKey: ["TeamRoom"],
    queryFn: async () => {
      const { data, errors } = await client.models.TeamRoom.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const { data: judgeData } = useQuery({
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

  const { data: teamData } = useQuery({
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

  const judgeRooms = roomData
    ?.map((room) => ({
      roomName: room.name,
      room_id: room.id,
      judgeNames:
        judgeData
          ?.filter((judge) => judge.JUDGE_roomId === room.id)
          .map((judge) => judge.firstName)
          .join(" & ") || "",
      color: "#D6C9FF",
    }))
    .sort((a, b) =>
      a.roomName > b.roomName ? 1 : b.roomName > a.roomName ? -1 : 0,
    );

  const judgingEvents = teamRoomData?.map((teamRoom) => ({
    event_id: teamRoom.id,
    title:
      teamData
        ?.filter((team) => team.id === teamRoom.teamId)
        .map((team) => team.name)
        .join(", ") || "No Team Name",
    room_id: teamRoom.roomId, // for some reason wont render if camelcase lol
    start: new Date(teamRoom.time),
    end: new Date(new Date(teamRoom.time).getTime() + 15 * 60 * 1000),
    zoomLink: teamRoom.zoomLink,
  }));

  return (
    <>
      <RoomAssigner judgingScheduleMutation={mutate} />
      <div className="flex justify-center">
        <div className="m-4 w-full max-w-[1500px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
          {judgeRooms && judgingEvents ? (
            <JudgingTimeline
              judgeRooms={judgeRooms}
              judgingEvents={judgingEvents}
            />
          ) : (
            <div className="size-full">Schedule not made yet</div>
          )}
        </div>
      </div>
    </>
  );
}
