"use client";

import { generateClient } from "aws-amplify/api";

import { type Schema } from "@/amplify/data/resource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUser } from "../contexts/UserContext";

const INPUT_STYLES =
  "rounded-full border-4 placeholder-black border-white bg-[#FFFFFF] bg-white/30 ps-3 py-2 my-2 text-sm md:text-md backdrop-opacity-30";

const client = generateClient<Schema>();
export default function TeamForm() {
  const queryClient = useQueryClient();
  const {
    currentUser,
    currentUser: { teamId: userTeamId },
  } = useUser();
  const { data: data } = useQuery({
    queryKey: ["Team", userTeamId],
    queryFn: async () => {
      const { data: team } = await currentUser.team();
      if (!team) throw new Error("No team found");
      return team;
    },
    enabled: !!userTeamId,
  });
  const { data: teamData, isFetching } = useQuery({
    queryKey: ["TeamWithMembers"],
    queryFn: async () => {
      const teamWithMembers = await data?.members();
      if (!teamWithMembers) throw new Error("No team members found");

      return teamWithMembers.data;
    },
    enabled: !!data,
  });
  const teamMutation = useMutation({
    mutationFn: async () => {
      if (!userTeamId) throw new Error("No team ID found");
      const { data, errors } = await client.models.User.update({
        id: currentUser.id,
        teamId: null,
      });
      console.log(data);
      if (errors) throw new Error("TeamID Not found" + errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Team", userTeamId],
      });
    },
  });
  const handleLeaveTeamClick = () => {
    teamMutation.mutate();
  };

  if (!data) return null;
  return (
    <>
      <form className={"flex flex-col md:mx-10"}>
        <label>Team ID</label>
        <input
          className={INPUT_STYLES}
          type="text"
          placeholder={data.id}
          disabled
        />
        <label>Team Name</label>
        <input
          className={INPUT_STYLES}
          type="text"
          placeholder={data.name}
          disabled
        />
        <label>Team Members</label>
        <div className="flex flex-col">
          {isFetching ? (
            <h1 className={INPUT_STYLES}>Loading...</h1>
          ) : (
            <>
              {Array.isArray(teamData) &&
                teamData.map((member) => (
                  <input
                    key={member.id}
                    className={INPUT_STYLES}
                    type="text"
                    value={`${member.firstName} ${member.lastName}`}
                    disabled
                  />
                ))}
            </>
          )}
        </div>
      </form>
      <div className="mb-10 mt-3 flex justify-end md:mx-10">
        <button
          className={` bg-apricot my-2 w-full rounded-full border-4  border-white px-10 py-2 text-white md:w-auto md:px-12`}
          onClick={handleLeaveTeamClick}
        >
          Leave Team
        </button>
      </div>
    </>
  );
}
