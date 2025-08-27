"use client";

import { generateClient } from "aws-amplify/api";
import debounce from "lodash.debounce";
import { useMemo } from "react";
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
  const debouncedLeaveTeam = useMemo(
    () => debounce(() => teamMutation.mutate(data), 1000),
    [teamMutation.mutate, data],
  );
  const handleLeaveTeamClick = () => {
    debouncedLeaveTeam();
  };

  const client = generateClient<Schema>();

  const { data: teamData, isFetching } = useQuery({
    initialData: null,
    initialDataUpdatedAt: 0,
    queryKey: ["TeamWithMembers"],
    queryFn: async () => {
      const { data: teamWithMembers } = await client.models.Team.get(
        { id: data.id },
        { selectionSet: ["id", "members.*"] },
      );

      return teamWithMembers;
    },
    enabled: !!data,
  });

  return (
    <>
      {data && (
        <>
          <form className={FORM_STYLES}>
            <label>Team ID</label>
            <input
              className={INPUT_STYLES}
              type="text"
              placeholder={data.id ?? "Team ID"}
              disabled
            />
            <label>Team Name</label>
            <input
              className={INPUT_STYLES}
              type="text"
              placeholder={data.name ?? "Team Name"}
              disabled
            />
            <label>Team Members</label>
            <div className="flex flex-col">
              {isFetching ? (
                <h1 className={INPUT_STYLES}>Loading...</h1>
              ) : (
                <>
                  {Array.isArray(teamData?.members) &&
                    teamData?.members.map(
                      (member: Partial<Schema["User"]["type"]>) => (
                        <input
                          key={member.id}
                          className={INPUT_STYLES}
                          type="text"
                          value={`${member.firstName} ${member.lastName}`}
                          disabled
                        />
                      ),
                    )}
                </>
              )}
            </div>
          </form>
          <div className="mb-10 mt-3 flex justify-end md:mx-10">
            <button
              className={`${BUTTON_STYLES} w-full md:w-auto`}
              onClick={handleLeaveTeamClick}
            >
              Leave Team
            </button>
          </div>
        </>
      )}
    </>
  );
}
