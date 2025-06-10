"use client";

import { client } from "@/app/QueryProvider";
import { useQuery } from "@tanstack/react-query";

import KevinLoadingRing from "../KevinLoadingRing";

export default function TeamInformation({
  state = "Registered",
  teamID,
}: {
  state?: "Registered" | "Joined";
  teamID: string;
}) {
  const { isPending, data } = useQuery({
    queryKey: ["Team", teamID],
    queryFn: async () => {
      return (await client.models.Team.get({ id: teamID })).data;
    },
  });
  const teamName = data?.name ?? "Unknown";
  if (isPending)
    return (
      <div className="mt-4">
        <KevinLoadingRing />
      </div>
    );
  if (state === "Joined")
    return (
      <div className=" flex flex-col gap-4 text-center text-5xl font-bold">
        <div className=" ">{"It's official!"}</div>
        <h1>You joined {teamName}.</h1>
        <p className="text-3xl">Your Team ID is {teamID}.</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-8 py-8 text-dark-grey">
      <h1 className=" flex flex-col items-center text-center text-4xl font-semibold md:text-5xl">
        <p className="max-w-xs truncate sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
          {teamName + "'s"}
        </p>
        Team ID is: <br />
        <span className="tracking-widest">{teamID}</span>
      </h1>
      <div className="text-center text-xl font-medium">
        <span className="">
          Provide this ID to all team members.
          <br />
          Each member
        </span>
        <span className="font-semibold"> must </span>
        <span>
          submit this Team ID <br /> to
        </span>
        <span className="font-semibold"> Join Existing Team</span>
        <span> to participate in the Hackathon.</span>
      </div>
    </div>
  );
}
