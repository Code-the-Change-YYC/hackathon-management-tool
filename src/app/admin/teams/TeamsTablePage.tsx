import DataTableSection from "@/app/admin/components/DataTableSection";
import FilterSection from "@/app/admin/components/FilterSection";

const teams = [
  { teamName: "PickledBread", status: "TEAM - Approved, Not Checked in" },
  { teamName: "EcoFlow", status: "TEAM - Approved, Checked In" },
  { teamName: "CatLovers", status: "TEAM - Approved, Not Checked In" },
];

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Team Name", className: "w-1/3" },
  { columnHeader: "Status", className: "w-2/5" },
];

const tableData = teams.map((team) => [team.teamName, team.status]);

const filters = [{ label: "Approved" }, { label: "Checked-in" }];

const TeamsTablePage = () => {
  return (
    <div>
      <FilterSection topLabel="Teams" filterLabels={filters} />
      {/* teams data tile */}
      <DataTableSection tableData={tableData} tableHeaders={tableHeaders} />
    </div>
  );
};

export default TeamsTablePage;
