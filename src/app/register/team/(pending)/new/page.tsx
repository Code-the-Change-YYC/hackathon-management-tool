"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { type Id, toast } from "react-toastify";

import { client } from "@/app/QueryProvider";
import PurpleButton from "@/components/PurpleButton";
import { useUser } from "@/components/contexts/UserContext";
import { Underline } from "@/utils/text-utils";
import { useMutation } from "@tanstack/react-query";

export default function page() {
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const user = useUser();
  const toastRef = useRef<Id>("");
  const teamMutation = useMutation({
    mutationFn: async (input: string) => {
      if (user.currentUser.teamId) {
        throw new Error("User already has a team");
      }
      const res = await client.mutations.CreateTeamWithCode({
        teamName: input,
        addCallerToTeam: true,
      });
      if (res.errors) throw new Error(res.errors[0].message);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        toast.update(toastRef.current, {
          render: "Team created successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        const teamID = JSON.parse(data.body?.toString() || "").value;
        router.push(`/register/team/${teamID}`);
      }
    },
    onError: (error) => {
      toast.update(toastRef.current, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    },
  });
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toastRef.current = toast.loading("Creating team...");
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
          <PurpleButton type="button">Back</PurpleButton>
        </Link>
        <PurpleButton disabled={teamMutation.isPending} type="submit">
          {teamMutation.isPending ? "Registering..." : "Register"}
        </PurpleButton>
      </div>
    </form>
  );
}
