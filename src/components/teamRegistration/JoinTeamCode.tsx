"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useRef, useState } from "react";
import type { Id } from "react-toastify";
import { toast } from "react-toastify";

import { client } from "@/app/QueryProvider";
import { useMutation } from "@tanstack/react-query";

import PurpleButton from "../PurpleButton";
import { useUser } from "../contexts/UserContext";

export default function JoinTeamCode() {
  const [teamIDInput, setTeamIDInput] = useState(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const toastRef = useRef<Id>("");
  const handleTeamIDInput = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newTeamIDInput = [...teamIDInput];
    newTeamIDInput[index] = value.toUpperCase();
    setTeamIDInput(newTeamIDInput);

    // Automatically focus the next input
    if (value && index < teamIDInput.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const router = useRouter();
  const { currentUser } = useUser();
  const joinTeamMutation = useMutation({
    mutationFn: async (teamID: string) => {
      return await client.mutations.AssignUsersToTeams({
        teamId: teamID,
        userId: currentUser.username,
      });
    },
    onSuccess: (res) => {
      if (res.data?.body && res.data.statusCode === 200) {
        toast.update(toastRef.current, {
          render: "Team joined successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.push(`/join/team/${teamIDInput.join("")}`);
      } else {
        toast.update(toastRef.current, {
          render: "Failed to join team",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    onError: () => {
      toast.error("Failed to join team");
    },
  });
  const handleJoinTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teamID = teamIDInput.join("");
    toastRef.current = toast.loading("Joining team...");
    joinTeamMutation.mutate(teamID);
  };
  const handleCancelInput = () => {
    setTeamIDInput(Array(4).fill(""));
    inputRefs.current[0]?.focus();
  };
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleJoinTeam}>
        <div className="flex flex-col gap-4 rounded-3xl bg-rose-200/50 px-24 py-8  outline outline-rose-500/50">
          <div className=" pb-12 text-center text-3xl font-semibold leading-10 text-rose-500/80">
            Enter 4-digit Team ID
          </div>
          <div className="flex justify-center gap-2.5 pb-12 sm:gap-8">
            {teamIDInput.map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                className="size-16 rounded-xl bg-white text-center text-3xl font-semibold outline outline-rose-500"
                value={teamIDInput[index].toUpperCase()}
                onChange={(e) => handleTeamIDInput(e, index)}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col flex-wrap items-center justify-between gap-2 lg:flex-row">
          <Link href="/register/team/ready">
            <PurpleButton type="button" className="w-48">
              Back
            </PurpleButton>
          </Link>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2">
            <PurpleButton
              type="reset"
              className="w-48"
              onClick={handleCancelInput}
            >
              Cancel
            </PurpleButton>
            <PurpleButton type="submit" className="w-48">
              {joinTeamMutation.isPending ? "Joining..." : "Join"}
            </PurpleButton>
          </div>
        </div>
      </form>
    </>
  );
}
