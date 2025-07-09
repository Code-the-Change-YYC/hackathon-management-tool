import Image from "next/image";

const squiggle = "/svgs/createTeamPage/squiggle_left.svg";
const squiggle2 = "/svgs/createTeamPage/squiggle_right.svg";
const doubleUnderline = "/svgs/createTeamPage/double_underline.svg";
const bottomSquiggle = "/svgs/createTeamPage/bottom_squiggle.svg";
const stars = "/svgs/createTeamPage/stars.svg";

const CREATE_TEAM_SECTION_STYLES = "flex-col py-6 items-center";
const REGISTER_HEADING_CONTAINER_STYLES =
  "flex max-w-[940px] w-full relative mx-auto md:mt-8 justify-center";
const REGISTER_HEADING_TEXT_STYLES =
  "text-4xl font-bold my-12 mt-6 md:mr-28 text-center md:w-[950px] mx-0 w-4/5";
const CREATE_TEAM_BODY_CONTAINER_STYLES = "mx-auto flex w-5/6 max-w-[1000px]";
const CREATE_TEAM_TILE_STYLES = "bg-white p-6 rounded-3xl flex justify-center";
const CREATE_TEAM_TEXT_INFO_STYLES = "text-dark-grey";
const CREATE_TEAM_STEPS_STYLES = "my-8";
const READY_TO_REGISTER_CONTAINER_STYLES = "my-8 flex justify-center";
const READY_TO_REGISTER_TEXT_STYLES = "text-center text-2xl font-semibold";
const BUTTON_STYLES =
  "my-4 md:my-0 h-12 w-full bg-awesomer-purple font-semibold text-xl rounded-[70px] border-4 border-white shadow-md md:w-[300px]";
const BUTTON_CONTAINER_STYLES =
  "md:flex md:flex-row-reverse md:justify-between";

const CreateTeamPage = () => {
  return (
    <div className="bg-awesomer-purple">
      <div className={CREATE_TEAM_SECTION_STYLES}>
        <div className={REGISTER_HEADING_CONTAINER_STYLES}>
          <Image
            className="hidden md:flex"
            src={squiggle}
            alt="squiggle svg"
            width={170}
            height={170}
          />
          <h1 className={REGISTER_HEADING_TEXT_STYLES}>
            Register for Hack the Change{" "}
            <span className="text-pastel-green">2025</span>
          </h1>
          <Image
            className="absolute right-12 top-3 hidden md:flex"
            src={squiggle2}
            alt="squiggle svg"
            width={70}
            height={70}
          />
        </div>
        <div className={CREATE_TEAM_BODY_CONTAINER_STYLES}>
          <Image
            className="mr-4 mt-auto hidden md:flex"
            src={stars}
            alt="doodle sparkles"
            width={50}
            height={50}
          />
          <div className="flex justify-center">
            <div className={CREATE_TEAM_TILE_STYLES}>
              <div className="max-w-[900px]">
                <div className={CREATE_TEAM_TEXT_INFO_STYLES}>
                  <h2 className="text-2xl font-semibold">
                    Next steps...
                    <br />
                    Create your team!
                  </h2>
                  <Image
                    src={doubleUnderline}
                    alt="double underline"
                    className="hidden md:flex"
                    width={200}
                    height={200}
                  />
                  <h2 className="m-5 mt-8 hidden text-xl md:flex">
                    <b>Looking for a team?</b>
                  </h2>
                  <ol className="ml-5 list-decimal md:px-7">
                    <li className={CREATE_TEAM_STEPS_STYLES}>
                      Join the <b>Code the Change YYC Discord</b> and navigate
                      to the <b>#looking-for-a-team</b> channel.
                    </li>
                    <li className={CREATE_TEAM_STEPS_STYLES}>
                      Reach out to an <b>existing team</b> or{" "}
                      <b>form a new team</b>.
                    </li>
                    <li>
                      After forming a team, assign <b>ONE</b> member to{" "}
                      <b>&quot;Register New Team&quot;</b> using your Team Name.
                      They will receive a unique <b>4-digit Team ID</b>{" "}
                      following registration.
                    </li>
                    <li className={CREATE_TEAM_STEPS_STYLES}>
                      Next, provide this <b>4-digit Team ID</b> to all team
                      members.
                    </li>
                    <li className={CREATE_TEAM_STEPS_STYLES}>
                      <b>EACH</b> team member <b>must</b> navigate to{" "}
                      <b>&quot;Join Existing Team&quot;</b> to submit this ID to
                      oficially join the group.
                    </li>
                  </ol>
                  <div className={READY_TO_REGISTER_CONTAINER_STYLES}>
                    <div className={READY_TO_REGISTER_TEXT_STYLES}>
                      <h2>
                        Ready to Register a new team or Join an existing team?
                      </h2>
                    </div>
                  </div>
                </div>
                <div className={BUTTON_CONTAINER_STYLES}>
                  <button className={BUTTON_STYLES}>Yes!</button>
                  <button className={BUTTON_STYLES}>Remind me later</button>
                </div>
              </div>
            </div>
          </div>
          <Image
            className="mb-auto ml-4 hidden md:flex"
            src={stars}
            alt="doodle sparkles"
            width={50}
            height={50}
          />
        </div>
        <div className="my-10 hidden w-full md:flex">
          <Image
            src={bottomSquiggle}
            alt="long squiggly line"
            width={2000}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTeamPage;
