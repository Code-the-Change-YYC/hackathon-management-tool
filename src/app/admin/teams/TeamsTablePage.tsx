import DataTableSection from "../components/DataTableSection";
import FilterSection from "../components/FilterSection";

// const TEAMS_TABLE_SECTION_STYLES =
//   "text-xl text-black flex flex-col items-center";
// const TEAMS_TABLE_SECTION_CONTENT_STYLES = "w-4/5 max-w-[1500px]";

const teams = [
  { teamName: "PickledBread", status: "TEAM - Approved, Not Checked in" },
  { teamName: "EcoFlow", status: "TEAM - Approved, Checked In" },
  { teamName: "CatLovers", status: "TEAM - Approved, Not Checked In" },
];

const filters = [
  { topLabel: "Teams" },
  { label: "Approved" },
  { label: "Checked-in" },
];

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Team Name", className: "w-1/2" },
  { columnHeader: "Status" },
];

const tableData = teams.map((team) => [team.teamName, team.status]);

const TeamsTablePage = () => {
  return (
    <div>
      <FilterSection filters={filters} />
      {/* teams data tile */}
      <DataTableSection tableData={tableData} tableHeaders={tableHeaders} />
    </div>
  );
};

export default TeamsTablePage;
