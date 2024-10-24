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
  const timeSlot = "10:00 AM - 10:05 AM";
  const userId = useUser().currentUser.username as string;
  console.log(userId);
  const { data: userData } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["User", userId],
    queryFn: async () => {
      const { data, errors } = await client.models.User.get({
        id: userId,
      });
      console.log(userId);

      if (errors) {
        throw new Error("Error fetching user data");
      }
      return data;
    },
  });

  //Fetch team data using the teamId from userData

  const teamId = userData?.teamId;
  const { data: teamData, isFetching } = useQuery({
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
          {isFetching ? "Loading..." : <div>{`${teamName}'s `}</div>}
          <div className="">Judging Information</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 text-start">
        <div className="font-medium">Time Slot </div>

        {isFetching ? (
          "Loading"
        ) : (
          <div className=" text-3xl italic text-neutral-800 xl:text-5xl">
            {timeSlot}
          </div>
        )}
      </div>
    </Card>
  );
}
