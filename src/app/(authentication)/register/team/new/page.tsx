"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { client } from "@/app/QueryProvider";
import PurpleButton from "@/components/PurpleButton";
import { Underline } from "@/utils/text-utils";
import { useMutation } from "@tanstack/react-query";

export default function page() {
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const teamMutation = useMutation({
    mutationFn: async (input: string) => {
      return await client.mutations.CreateTeamWithCode({
        teamName: input,
        addCallerToTeam: true,
      });
    },
    onSuccess: (res) => {
      if (res.data?.body) {
        const teamID = JSON.parse(res.data.body.toString()).value;
        router.push(`/register/team/${teamID}`);
      } else {
        router.push(`/register/team/error`);
      }
    },
  });
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    teamMutation.mutate(teamName);
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 md:p-8"
    >
      <div className="ml-4 flex items-center justify-center text-3xl font-semibold sm:items-start sm:justify-start">
        <Underline>Register new team</Underline>
      </div>
      <div className="flex flex-col gap-2 sm:py-12">
        <label htmlFor="teamName" className="w-fit drop-shadow">
          Team Name
        </label>
        <input
          id="teamName"
          type="text"
          className="w-full rounded-xl border-2 border-black/20 p-2"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          maxLength={50}
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-4 text-white sm:flex-row">
        <Link href={"/register/team/ready"}>
          <PurpleButton>Back</PurpleButton>
        </Link>
        <PurpleButton disabled={teamMutation.isPending} type="submit">
          Register
        </PurpleButton>
      </div>
    </form>
  );
}
