"use client";

import { generateClient } from "aws-amplify/api";

import { type Schema } from "@/amplify/data/resource";
import JudgingTimeline from "@/components/admin/Judging/JudgingTimeline";
import RoomAssigner from "@/components/admin/Judging/RoomAssigner";
import { useMutation, useQuery } from "@tanstack/react-query";

const client = generateClient<Schema>();

export default function JudgingSchedule() {
  const { mutate, data } = useMutation({
    mutationFn: async ({
      judgingSessionsPerTeam,
      numOfJudgingRooms,
    }: {
      judgingSessionsPerTeam: number;
      numOfJudgingRooms: number;
    }) => {
      try {
        console.log(judgingSessionsPerTeam);
        console.log(numOfJudgingRooms);
        const response = await client.mutations.ScheduleTeamsAndJudges({
          judgingSessionsPerTeam,
          numOfJudgingRooms,
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
    queryKey: ["roomData"],
    queryFn: async () => {
      const { data, errors } = await client.models.Room.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
  });

  const { data: teamRoomData } = useQuery({
    queryKey: ["teamRoomData"],
    queryFn: async () => {
      const { data, errors } = await client.models.TeamRoom.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
  });
  console.log(teamRoomData);
  console.log(roomData);

  return (
    <>
      <RoomAssigner judgingScheduleMutation={mutate} />
      <div className="flex justify-center">
        <div className="m-4 w-full max-w-[1500px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
          <JudgingTimeline />
        </div>
      </div>
    </>
  );
}
