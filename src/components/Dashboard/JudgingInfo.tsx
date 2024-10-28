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
  const href = "#";
  const userId = useUser().currentUser.username as string;
  const { data: userData } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["User", userId],
    queryFn: async () => {
      const { data, errors } = await client.models.User.get({
        id: userId,
      });

      if (errors) {
        throw new Error("Error fetching user data");
      }
      return data;
    },
  });

  //Fetch team data using the teamId from userData

  const teamId = userData?.teamId;
  console.log(teamId);
  const { data: teamData, isFetching: isFetchingTeamName } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["Team", teamId],
    queryFn: async () => {
      if (!teamId) {
        throw new Error("Team ID is undefined");
      }
      const { data, errors } = await client.models.Team.get({
        id: teamId,
      });

      if (errors) {
        throw new Error("Error fetching team data");
      }
      return data;
    },
  });

  const teamName = teamData?.name || "Team Name";

  //Fetch team data
  const { data: teamRoomData, isFetching: isFetchingTeamRoom } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["TeamRoom", teamId],
    queryFn: async () => {
      if (!teamId) {
        throw new Error("Team ID is undefined");
      }
      const { data, errors } = await client.models.TeamRoom.list({
        filter: {
          teamId: { eq: teamId },
        },
        selectionSet: ["id", "time", "zoomLink", "roomId", "teamId"],
      });

      if (errors) {
        throw new Error("Error fetching team room data");
      }
      return data;
    },
  });
  const timeSlot = teamRoomData?.[0]?.time
    ? new Date(teamRoomData[0].time).toLocaleString()
    : "Time not available";

  //Fetch judge data
  const judgeId = userData?.JUDGE_givenScores;
  const { data: judgeData, isFetching: isFetchingJudgeData } = useQuery({
    queryKey: ["Score", judgeId],
    queryFn: async () => {
      if (!judgeId) {
        throw new Error("Team ID is undefined");
      }
      const { data, errors } = await client.models.Score.get({});

      if (errors) {
        throw new Error("Error fetching judge data");
      }
      return data;
    },
  });
  const judgeNames = judgeData?.[0]?.judge || "Time not available";

  return (
    <Card className="flex-1 items-start justify-start gap-4 px-4">
      <div className="flex items-center gap-4">
        <Link href={href}>
          <Image
            className="transition duration-300 hover:opacity-90"
            src={JudgeIcon}
            alt={"Food Ticket Icon"}
          />
        </Link>
        <div className="text-start font-medium">
          {isFetchingTeamName ? "Loading..." : <div>{`${teamName}'s `}</div>}
          <div className="">Judging Information</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 text-start">
        <div className="font-medium">Time Slot </div>

        {isFetchingTeamRoom ? (
          "Loading"
        ) : (
          <div className=" text-3xl italic text-neutral-800 xl:text-5xl">
            {timeSlot}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 text-start">
        <div className="font-medium">Judges </div>

        {isFetchingJudgeData ? (
          "Loading"
        ) : (
          <div className=" text-3xl italic text-neutral-800 xl:text-5xl">
            {judgeNames}
          </div>
        )}
      </div>
    </Card>
  );
}
