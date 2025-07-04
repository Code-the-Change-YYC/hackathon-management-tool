"use client";

import { type Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import KevinLoadingRing from "@/components/KevinLoadingRing";
import TeamForm from "@/components/UserProfile/TeamForm";
import { useUser } from "@/components/contexts/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-grapefruit px-10  md:px-12 py-2 my-2 text-white";

const TEAM_INSTRUCTION_STYLES =
  "bg-pink bg-white/30 mx-10 my-10 rounded-3xl  border-4 border-white bg-white px-10 py-20 md:px-20 md:py-16";

const TeamProfile = () => {
  const queryClient = useQueryClient();

  const userTeamId = useUser().currentUser.teamId as string;

  const { data, isFetching } = useQuery({
    initialData: {} as Schema["Team"]["type"],
    initialDataUpdatedAt: 0,
    queryKey: ["Team", userTeamId],
    queryFn: async () => {
      const teamResponse = await client.models.Team.get({
        id: userTeamId,
      });

      if (teamResponse.errors) throw new Error(teamResponse.errors[0].message);

      return teamResponse.data;
    },
    enabled: !!userTeamId,
  });

  const teamMutation = useMutation({
    mutationFn: async () => {
      try {
        await client.models.User.update({ id: userTeamId, teamId: null });
      } catch (error) {
        console.error("Error updating ids", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Team", userTeamId],
      });
    },
  });

  return (
    <>
      {isFetching || !userTeamId ? (
        <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
          <KevinLoadingRing />
        </div>
      ) : (
        <>
          <div className="  mb-3 flex justify-between uppercase text-grapefruit md:mx-10">
            <h1 className="my-4 text-lg font-bold md:mt-3 md:text-2xl">
              Team Details
            </h1>
          </div>
          {data?.id ? (
            <>
              <TeamForm data={data} teamMutation={teamMutation} />
            </>
          ) : (
            <div>
              <p className="mx-10">
                Oops, looks like you’re not in a team yet. Are you looking to
                join a team?
              </p>
              <div className={TEAM_INSTRUCTION_STYLES}>
                <h1 className="mb-10 text-3xl font-bold">
                  Looking for a team?
                </h1>
                <ol className="space-y-4 pl-4">
                  <li>
                    1. Join the <strong>Code the Change YYC</strong> Discord and
                    navigate to the #looking-for-a-team channel.
                  </li>
                  <li>
                    2. Reach out to an <strong>existing</strong> team or form a
                    new team.
                  </li>
                  <li>
                    3. After forming a team , assign <strong>ONE</strong> member
                    to “Register New Team” using your Team Name. They will
                    receive a unique 4-digit Team ID following registration.
                  </li>
                  <li>
                    4. Next, provide this 4-digit <strong>Team ID</strong> to
                    all team members.
                  </li>
                  <li>
                    5. <strong>EACH</strong> team member <strong>must</strong>{" "}
                    navigate to <strong>“Join Existing Team”</strong> to submit
                    this ID to officially join the group.
                  </li>
                </ol>
              </div>
              <div className="my-6 flex justify-end">
                <button className={`${BUTTON_STYLES} mx-10 w-full md:w-auto`}>
                  <a href="/register/team">Join Team</a>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default TeamProfile;
