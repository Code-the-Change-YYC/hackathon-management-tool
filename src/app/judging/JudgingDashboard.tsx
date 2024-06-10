import Image from "next/image";

import JudgingTable from "@/components/judging/JudgingTable";
import StatsPanel from "@/components/judging/StatsPanel";

const pink_underlines = "/svgs/judging/pink_underline.svg";

const JUDGE_DASHBOARD_PAGE_STLYES = "flex justify-center text-blackish";
const JUDGE_DASHBOARD_CONTENT_STYLES = "w-full max-w-[1500px] p-6";

const JUDGE_DASHBOARD_HELLO_TILE_STYLES =
  "mb-6 flex rounded-lg bg-white p-8 pb-6 text-4xl font-semibold drop-shadow-md";

const SUBHEADER_TEXT_STYLES = "mb-4 text-xl font-semibold";

// REPLACE WITH ACTUAL DATA
const panelData = [
  {
    icon: "/svgs/judging/team_icon.svg",
    alt: "Teams assigned icon",
    stat: 10,
    text: "Teams Assigned to Room 1", //replace with real room assignment
  },
  {
    icon: "/svgs/judging/teams_left.svg",
    alt: "Teams left icon",
    stat: 5,
    text: "Teams Left To Score",
  },
];

const tableHeaders = [
  { columnHeader: "Team Name", className: "w-1/3 rounded-tl-lg" },
  { columnHeader: "Criteria 1", className: "w-1/7" },
  { columnHeader: "Criteria 2", className: "w-1/7" },
  { columnHeader: "Criteria 3", className: "w-1/7" },
];

const tableData: Array<[string, string, string, string, boolean]> = [
  ["Team A", "100", "99", "90", true],
  ["Team B", "100", "99", "90", true],
  ["Team C", "100", "99", "90", true],
  ["Team D", "N/A", "N/A", "N/A", false],
  ["Team E", "100", "99", "90", true],
  ["Team F", "100", "99", "90", true],
  ["Team G", "100", "99", "90", true],
  ["Team H", "N/A", "N/A", "N/A", false],
  ["Team I", "100", "99", "90", true],
  ["Team J", "100", "99", "90", true],
];

const JudgingDashboard = () => {
  return (
    <div className={JUDGE_DASHBOARD_PAGE_STLYES}>
      <div className={JUDGE_DASHBOARD_CONTENT_STYLES}>
        <div className={JUDGE_DASHBOARD_HELLO_TILE_STYLES}>
          <h1>Hello,</h1>
          <div className="ml-2">
            <h1 className="text-dark-pink">
              <i>Judge!</i>
            </h1>
            <div className="mt-2 flex justify-center">
              <Image
                src={pink_underlines}
                height={100}
                width={80}
                alt="Pink underlines"
              />
            </div>
          </div>
        </div>
        <h2 className={SUBHEADER_TEXT_STYLES}>Assigned Teams</h2>
        <div className="flex">
          <div className="mr-4 w-1/4">
            {panelData.map(({ icon, alt, stat, text }, index) => (
              <StatsPanel
                icon={icon}
                alt={alt}
                stat={stat}
                key={index}
                subheader={text}
              />
            ))}
          </div>
          <div className="mb-4 w-3/4">
            <JudgingTable tableHeaders={tableHeaders} tableData={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgingDashboard;
