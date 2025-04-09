"use client";

import { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";

import { client } from "@/app/QueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

import FormInput from "../UserProfile/FormInput";
import { useUser } from "../contexts/UserContext";

export default function DevPostLinkUpload() {
  const {
    currentUser: { team, id: userId },
  } = useUser();
  const { data: userTeam } = useQuery({
    queryKey: ["Team", userId],
    queryFn: async () => {
      const userTeam = await team();
      if (!userTeam || userTeam.errors)
        throw new Error(
          userTeam?.errors?.[0]?.message ?? "Error fetching team data",
        );
      return userTeam.data;
    },
  });
  const [devPostLink, setDevPostLink] = useState("");
  const devPostMutation = useMutation({
    mutationKey: ["DevPostLink"],
    mutationFn: async () => {
      if (!devPostLink || !userTeam) return;
      const { data, errors } = await client.models.Team.update({
        id: userTeam.id,
        devPostLink,
      });
      if (errors) {
        toast.error(errors[0].message ?? "Error updating DevPost link");
        throw new Error(errors[0].message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("DevPost link updated successfully!");
    },
    onError: () => {
      toast.error("Error updating DevPost link. Please try again.");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    devPostMutation.mutate();
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 py-2">
      <FormInput
        name={"devPostLink"}
        placeholder={userTeam?.devPostLink ?? "Awaiting Submission..."}
        className="w-full border-2 border-gray-300 bg-gray-100 text-gray-500"
        value={devPostLink}
        onChange={(e) => setDevPostLink(e.target.value)}
      />
      <button type="submit" className="border-1 rounded-full border-red-500 ">
        <FaCircleArrowRight color="grey" />
      </button>
    </form>
  );
}
