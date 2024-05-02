import DataTableSection from "@/app/admin/components/DataTableSection";
import FilterSection from "@/app/admin/components/FilterSection";

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
  { columnHeader: "Status", className: "" },
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
