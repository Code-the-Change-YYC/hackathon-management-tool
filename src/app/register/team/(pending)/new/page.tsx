"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast, type Id } from "react-toastify";
import { client } from "@/app/QueryProvider";
import { useUser } from "@/components/contexts/UserContext";
import PurpleButton from "@/components/PurpleButton";
import { Underline } from "@/utils/text-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function page() {
  const queryClient = useQueryClient();
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const {
    currentUser: { teamId, id },
    revalidateUser,
  } = useUser();
  const teamMutation = useMutation({
    mutationKey: ["CreateTeam"],
    mutationFn: async (teamName: string) => {
      if (teamId) throw new Error("User already has a team");
      const toastObj = toast.loading("Creating team...");
      const res = await client.mutations.CreateTeamWithCode({
        teamName,
        addCallerToTeam: false, // broken in lambda function.
      });
      toast.dismiss(toastObj);
      if (!res.errors && res.data?.body) {
        const teamId = JSON.parse(res.data.body!.toString()).value;
        await client.models.User.update({
          id,
          teamId,
        });
        revalidateUser();
        return res.data;
      }
      throw new Error(res.errors?.[0]?.message);
    },
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        toast.success("Team created successfully", {
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        queryClient.invalidateQueries({ queryKey: ["User"] });
        const teamID = JSON.parse(data.body!.toString()).value;
        router.push(`/register/team/${teamID}`);
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
        <Link
          className="w-[300px] rounded-full border-4 border-white bg-awesomer-purple py-2 text-center text-xl  font-medium text-white shadow-md transition duration-300 hover:opacity-90"
          href={"/register/team/ready"}
        >
          Back
        </Link>
        <PurpleButton disabled={teamMutation.isPending} type="submit">
          {teamMutation.isPending ? "Registering..." : "Register"}
        </PurpleButton>
      </div>
    </form>
  );
}
