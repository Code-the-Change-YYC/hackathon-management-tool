"use client";

import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import Link from "next/link";

import { type Schema } from "@/amplify/data/resource";
import JudgeIcon from "@/images/dashboard/JudgeIcon.png";
import { useQuery } from "@tanstack/react-query";

import { useUser } from "../contexts/UserContext";
import Card from "./Card";

const client = generateClient<Schema>();

export default function JudgingInfo() {
  const userId = useUser().currentUser.username as string;

  const { data: userData } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["User", userId],
    queryFn: async () => {
      const { data, errors } = await client.models.User.get({ id: userId });
      if (errors) {
        throw new Error("Error fetching user data");
      }
      return data;
    },
    enabled: !!userId,
  });

  const teamId = userData?.teamId;
  const { data: teamData, isFetching: isFetchingTeamName } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["Team", teamId],
    queryFn: async () => {
      if (!teamId) throw new Error("Team ID is undefined");
      const { data, errors } = await client.models.Team.get({ id: teamId });
      if (errors) throw new Error("Error fetching team data");
      return data;
    },
    enabled: !!teamId,
  });

  const teamName = teamData?.name || "Team";

  const { data: teamRoomData, isFetching: isFetchingTeamRoom } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["TeamRoom", teamId],
    queryFn: async () => {
      if (!teamId) throw new Error("Team ID is undefined");
      const { data, errors } = await client.models.TeamRoom.list({
        filter: { teamId: { eq: teamId } },
      });
      if (errors) throw new Error("Error fetching team room data");
      return data;
    },
    enabled: !!teamId,
  });

  const timeSlot = teamRoomData?.[0]?.time
    ? new Date(teamRoomData[0].time)
    : null;

  const zoomLink = teamRoomData?.[0]?.zoomLink || null;

  const showZoomLink = (() => {
    if (!timeSlot) return false;

    const current = new Date();

    const fiveMinutesBefore = new Date(timeSlot);
    fiveMinutesBefore.setMinutes(timeSlot.getMinutes() - 5);

    return current >= fiveMinutesBefore;
  })();

  const roomId = teamRoomData?.[0]?.roomId;
  const { data: judgeRoomData, isFetching: isFetchingJudgeData } = useQuery({
    queryKey: ["Room", roomId],
    queryFn: async () => {
      if (!roomId) throw new Error("Room ID is undefined");
      const { data, errors } = await client.models.User.list({
        filter: { JUDGE_roomId: { eq: roomId } },
      });
      if (errors) throw new Error("Error fetching team room data");
      return data;
    },
    enabled: !!roomId,
  });

  const judgeNames =
    judgeRoomData
      ?.map((judge) => `${judge.firstName} ${judge.lastName}`)
      .join(", ") || "Judges not assigned";

  return (
    <Card className="flex-1 items-start justify-start gap-4 px-4">
      <div className="flex items-center gap-4">
        <Image
          className="transition duration-300 hover:opacity-90"
          src={JudgeIcon}
          alt={"Judging Icon"}
        />
        <div className="text-start font-medium">
          {isFetchingTeamName ? "Loading..." : <div>{`${teamName}'s `}</div>}
          <div className="">Judging Information</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 text-start">
        <div className="font-medium">Time Slot: </div>
        {isFetchingTeamRoom ? (
          "Loading..."
        ) : (
          <div className="text-3xl italic text-neutral-800 xl:text-5xl">
            {timeSlot ? timeSlot.toLocaleString() : "Room not assigned"}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 text-start">
        <div className="font-medium">Judges: </div>
        {isFetchingJudgeData ? (
          "Loading..."
        ) : (
          <div className="text-3xl italic text-neutral-800 xl:text-5xl">
            {judgeNames}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 text-start">
        <div className="font-medium">Zoom Link: </div>
        {zoomLink && showZoomLink ? (
          <Link
            href={zoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Join Zoom Meeting
          </Link>
        ) : (
          <div className="pointer-events-none cursor-default text-gray-500">
            Zoom link coming soon
          </div>
        )}
      </div>
    </Card>
  );
}
