"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

import { client } from "@/app/QueryProvider";
import { useMutation } from "@tanstack/react-query";

import PurpleButton from "../PurpleButton";
import { useUser } from "../contexts/UserContext";

export default function JoinTeamCode() {
  const [teamIDInput, setTeamIDInput] = useState(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
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
      if (res.data?.body) {
        toast.success("Successfully joined team");
        router.push(`/join/team/${teamIDInput.join("")}`);
      } else {
        toast.error("Failed to join team");
        router.push(`/team/error`);
      }
    },
    onError: () => {
      toast.error("Failed to join team");
      router.push(`/team/error`);
    },
  });
  const handleJoinTeam = () => {
    const teamID = teamIDInput.join("");
    console.log(teamID);
    joinTeamMutation.mutate(teamID);
  };
  return (
    <>
      <div className="flex flex-col gap-4 rounded-3xl bg-rose-200/50 px-24 py-8  outline outline-rose-500/50">
        <div className="pb-12 text-center text-3xl font-semibold leading-10 text-rose-500/80">
          Enter 4-digit Team ID
        </div>
        <div className="flex justify-center gap-8 pb-12">
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
              onChange={(e) => handleOnChange(e, index)}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-row justify-between">
        <PurpleButton className=" w-48"> Back</PurpleButton>
        <div className="flex flex-row gap-2">
          <PurpleButton className=" w-48">Cancel</PurpleButton>
          <PurpleButton className=" w-48" onClick={handleJoinTeam}>
            Join
          </PurpleButton>
        </div>
      </div>
    </>
  );
}
