"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import ProfileLinks from "@/components/UserProfile/ProfileLinks";
import { useQuery } from "@tanstack/react-query";

const INPUT_STYLES =
  "rounded-full border-4 placeholder-black border-white bg-[#FFFFFF] bg-white/30 ps-3 py-2 my-2 text-sm md:text-md backdrop-opacity-30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";

const FORM_STYLES = "md:mx-10 flex flex-col";

const TEAM_INSTRUCTION_STYLES =
  "bg-pink bg-white/30 mx-10 my-10 rounded-3xl  border-4 border-white bg-[#FFFFFF] px-10 py-20 md:px-20 md:py-16";

const client = generateClient<Schema>();

const TeamProfile = () => {
  const { data, isFetching } = useQuery({
    initialData: {} as Schema["Team"],
    initialDataUpdatedAt: 0,
    queryKey: ["Team", 1234],
    queryFn: async () =>
      (
        await client.models.Team.get({
          id: "1234",
        })
      ).data,
  });

  const [formState, setFormState] = useState<Schema["Team"]>(data);
  const [hasTeam, setHasTeam] = useState<boolean>(true);

  const handleLeaveTeamClick = () => {
    setHasTeam((prevHasTeam) => !prevHasTeam);
    console.log(hasTeam);
  };

  useEffect(() => {
    setFormState(data);
  }, [data, setFormState]);

  return (
    <>
      {isFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-[#FFD7C5]">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <div className="flex w-full flex-col bg-[#FFD7C5]">
          <div className="px-10  md:px-16 md:py-10">
            <ProfileLinks />
            <div className="  mb-3 flex justify-between uppercase text-[#FF6B54] md:mx-10">
              <h1 className="my-4 text-lg font-bold md:mt-3 md:text-2xl">
                Team Details
              </h1>
            </div>
            {hasTeam ? (
              <>
                <form className={FORM_STYLES}>
                  <label>Team ID</label>
                  <input
                    className={INPUT_STYLES}
                    type="text"
                    placeholder={formState.id ?? "Team ID"}
                    disabled
                  />
                  <label>Team Name</label>
                  <input
                    className={INPUT_STYLES}
                    type="text"
                    placeholder={formState.Name ?? "Team Name"}
                    disabled
                  />
                  <label>Team Members</label>
                  <div className="flex flex-col">
                    <input
                      className={INPUT_STYLES}
                      type="text"
                      placeholder="Member 1"
                      disabled
                    />
                    <input
                      className={INPUT_STYLES}
                      type="text"
                      placeholder="Member 2"
                      disabled
                    />
                    <input
                      className={INPUT_STYLES}
                      type="text"
                      placeholder="Member 3"
                      disabled
                    />
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
            ) : (
              <div>
                <p className="mx-10">
                  Oops, looks like you’re not in a team yet, looking to joining
                  a team?
                </p>
                <div className={TEAM_INSTRUCTION_STYLES}>
                  <h1 className="mb-10 text-3xl font-bold">
                    Looking for a team?
                  </h1>
                  <ol className="space-y-4 pl-4">
                    <li>
                      1. Join the <strong>Code the Change YYC</strong> Discord
                      and navigate to the #looking-for-a-team channel.
                    </li>
                    <li>
                      2. Reach out to an <strong>existing</strong> team or form
                      a new team.
                    </li>
                    <li>
                      3. After forming a team , assign <strong>ONE</strong>{" "}
                      member to “Register New Team” using your Team Name. They
                      will receive a unique 6-digit Team ID following
                      registration.
                    </li>
                    <li>
                      4. Next, provide this 6-digit <strong>Team ID</strong> to
                      all team members.
                    </li>
                    <li>
                      5. <strong>EACH</strong> team member <strong>must</strong>{" "}
                      navigate to <strong>“Join Existing Team”</strong> to
                      submit this ID to officially join the group.
                    </li>
                  </ol>
                </div>
                <div className="my-6 flex justify-end">
                  <button className={`${BUTTON_STYLES} mx-10 w-full md:w-auto`}>
                    <a href="/">Join Team</a>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default TeamProfile;
