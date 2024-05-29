import { type Schema } from "@/amplify/data/resource";
import { type TeamFormProp } from "@/components/UserProfile/TeamProfile";

const INPUT_STYLES =
  "rounded-full border-4 placeholder-black border-white bg-[#FFFFFF] bg-white/30 ps-3 py-2 my-2 text-sm md:text-md backdrop-opacity-30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";

const FORM_STYLES = "md:mx-10 flex flex-col";

export default function TeamForm({ data, teamMutation }: TeamFormProp) {
  const handleLeaveTeamClick = () => {
    teamMutation.mutate(data);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
              {Array.isArray(data.members) &&
                data.members.map((member: Schema["User"]["type"]) => (
                  <input
                    key={member.id}
                    className={INPUT_STYLES}
                    type="text"
                    value={`${member.firstName} ${member.lastName}`}
                    disabled
                  />
                ))}
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
