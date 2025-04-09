"use client";

import { generateClient } from "aws-amplify/api";
import { type Schema } from "@/amplify/data/resource";
import { useQuery } from "@tanstack/react-query";

const INPUT_STYLES =
  "rounded-full border-4 placeholder-black border-white bg-white bg-white/30 ps-3 py-2 my-2 text-sm md:text-md backdrop-opacity-30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-grapefruit px-10  md:px-12 py-2 my-2 text-white";

const FORM_STYLES = "md:mx-10 flex flex-col";

export interface TeamFormProp {
  data: Schema["Team"]["type"];
  teamMutation: any;
}

export default function TeamForm({ data, teamMutation }: TeamFormProp) {
  const handleLeaveTeamClick = () => {
    teamMutation.mutate(data);
  };

  const client = generateClient<Schema>();

  const { data: teamData, isFetching } = useQuery({
    queryKey: ["TeamWithMembers"],
    queryFn: async () => {
      const teamWithMembers = await userTeam?.members();
      if (!teamWithMembers) throw new Error("No team members found");

      return teamWithMembers.data;
    },
    enabled: !!userTeam,
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
      toast.success("You have left the team");
      revalidateUser();
      refetchTeam();
    },
  });
  const handleLeaveTeamClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    teamMutation.mutate();
  };
  if (!userTeam) return null;
  return (
    <>
      <form className="flex flex-col md:mx-10" onSubmit={handleLeaveTeamClick}>
        <FormInput
          name={userTeam.id}
          disabled
          value={userTeam.id}
          label={"Team ID"}
        />
        <FormInput
          name={userTeam.name}
          disabled
          value={userTeam.name}
          label={"Team Name"}
        />
        <FormInput
          name={"DevPost Link"}
          value={userTeam.devPostLink ?? "Awaiting Submission..."}
          disabled
          placeholder="Awaiting Submission..."
          label={"DevPost Link"}
        />
        <label>Team Members</label>
        <div className="flex flex-col">
          {isFetching ? (
            <h1 className="md:text-md my-2 rounded-full border-4 border-white  bg-white/30 py-2 ps-3 text-sm backdrop-opacity-30 placeholder:text-black">
              Loading...
            </h1>
          ) : (
            <>
              {Array.isArray(teamData) &&
                teamData.map((member) => (
                  <FormInput
                    key={member.id}
                    disabled
                    value={`${member.firstName} ${member.lastName}`}
                    name={member.id}
                  />
                ))}
            </>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className="w-full rounded-full border-4 border-white bg-apricot  px-10 py-2 text-white disabled:opacity-50 md:w-auto md:px-12"
            type="submit"
            disabled={teamMutation.isPending || teamMutation.isSuccess}
          >
            {teamMutation.isPending ? "Leaving Team..." : "Leave Team"}
          </button>
        </div>
      </form>
    </>
  );
}
