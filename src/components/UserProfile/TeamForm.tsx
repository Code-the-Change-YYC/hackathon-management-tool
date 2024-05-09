"use client";

import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { type TeamFormProp } from "@/components/UserProfile/TeamProfile";

const INPUT_STYLES =
  "rounded-full border-4 placeholder-black border-white bg-[#FFFFFF] bg-white/30 ps-3 py-2 my-2 text-sm md:text-md backdrop-opacity-30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";

const FORM_STYLES = "md:mx-10 flex flex-col";

export default function TeamForm({ data, setHasTeam }: TeamFormProp) {
  const handleLeaveTeamClick = () => {
    setHasTeam((prevHasTeam) => !prevHasTeam);
  };

  const [formState, setFormState] = useState<Schema["Team"]["type"]>(
    {} as Schema["Team"]["type"],
  );

  useEffect(() => {
    setFormState(data);
  }, []);

  return (
    <>
      {formState && (
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
      )}
    </>
  );
}
