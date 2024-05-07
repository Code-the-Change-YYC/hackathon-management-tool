import DataTableSection from "@/app/admin/components/DataTableSection";
import FilterSection from "@/app/admin/components/FilterSection";

const teams = [
  {
    teamName: "PickledBread",
    approveStatus: "Approved",
    checkinStatus: "Not Checked In",
    members: ["John Doe", "Jane Smith"],
    statuses: ["Active", "Inactive"],
  },
  {
    teamName: "EcoFlow",
    approveStatus: "Approved",
    checkinStatus: "Checked In",
    members: ["Alice Johnson", "Bob Williams"],
    statuses: ["Active", "Active"],
  },
  {
    teamName: "CatLovers",
    approveStatus: "Approved",
    checkinStatus: "Not Checked In",
    members: ["Charlie Brown", "Lucy Johnson"],
    statuses: ["Inactive", "Active"],
  },
];

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Team Name", className: "w-2/5" },
  { columnHeader: "Approve Status", className: "w-1/5" },
  { columnHeader: "Check-in Status", className: "w-1/5" },
];

const tableData = teams.map((team) => [
  team.teamName,
  team.approveStatus,
  team.checkinStatus,
]);

const filters = [{ label: "Approved" }, { label: "Checked-in" }];

const TeamsTablePage = () => {
  return (
    <div>
      <FilterSection topLabel="Teams" filterLabels={filters} />
      {/* teams data tile */}
      <DataTableSection
        tableData={tableData}
        tableHeaders={tableHeaders}
        showViewButton={true}
        membersData={teams}
      />
    </div>
  );
};

export default TeamsTablePage;
