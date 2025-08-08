"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { client } from "@/app/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../contexts/UserContext";
import PurpleButton from "../PurpleButton";

export default function JoinTeamCode() {
  const [teamIDInput, setTeamIDInput] = useState(Array(4).fill(""));
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      const clipboardContentsText = e.clipboardData?.getData("text");
      if (clipboardContentsText?.length === 4) {
        const teamIDArray = clipboardContentsText.split("");
        e.preventDefault();
        setTeamIDInput(teamIDArray);
        joinTeamMutation.mutate(teamIDArray.join(""));
      }
    };
    window.addEventListener("paste", handlePasteEvent);
    return () => {
      window.removeEventListener("paste", handlePasteEvent);
    };
  }, []);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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
      const toastObj = toast.loading("Joining team...");
      const res = await client.mutations.AssignUsersToTeams({
        teamId: teamID,
        userId: currentUser.username,
      });
      if (res.errors) {
        toast.dismiss(toastObj);
        throw new Error(res.errors[0].message);
      }
      toast.dismiss(toastObj);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        toast.success("Team joined successfully");
        router.push(`/join/team/${teamIDInput.join("")}`);
      }
    },
    onError: (e) => {
      const error = JSON.parse(e.message);
      toast.error("Failed to join team " + error.body.value);
    },
    mutationKey: ["JoinTeam"],
  });
  const handleJoinTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teamID = teamIDInput.join("");
    joinTeamMutation.mutate(teamID);
  };
  const handleCancelInput = () => {
    setTeamIDInput(Array(4).fill(""));
    inputRefs.current[0]?.focus();
  };
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleJoinTeam}>
        <div className="flex flex-col gap-4 rounded-3xl bg-pastel-pink/60 px-24 py-8  outline outline-dark-pink/50">
          <div className=" pb-12 text-center text-3xl font-semibold leading-10 text-dark-pink/90">
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
                className="size-16 rounded-xl bg-white text-center text-3xl font-semibold outline outline-dark-pink"
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
