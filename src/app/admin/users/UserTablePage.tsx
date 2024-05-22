import DataTableSection from "@/app/admin/components/DataTableSection";
import DropDownRole from "@/app/admin/components/DropDownRole";

const users = [
  {
    lastName: "Last",
    firstName: "First",
    role: "Participant",
    team: "Group Name",
    email: "email@ucalgary.ca",
  },
  {
    lastName: "Last",
    firstName: "First",
    role: "Judge",
    team: "",
    email: "email@ucalgary.ca",
  },
  {
    lastName: "Last",
    firstName: "First",
    role: "Participant",
    team: "Group Name",
    email: "email@ucalgary.ca",
  },
  {
    lastName: "Last",
    firstName: "First",
    role: "Judge",
    team: "",
    email: "email@ucalgary.ca",
  },
  {
    lastName: "Last",
    firstName: "First",
    role: "Participant",
    team: "Group Name",
    email: "email@ucalgary.ca",
  },
] as const;

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Last Name", className: "w-1/6" },
  { columnHeader: "First Name", className: "w-1/6" },
  { columnHeader: "Role", className: "w-1/6" },
  { columnHeader: "Team", className: "w-1/6" },
  { columnHeader: "Email", className: "w-1/6" },
  { columnHeader: "", className: "w-1/3" },
];

const tableData = users.map((user) => [
  user.lastName,
  user.firstName,
  user.role,
  user.team,
  user.email,
]);

export default function UserTablePage() {
  return (
    <div>
      <DropDownRole />
      <DataTableSection tableData={tableData} tableHeaders={tableHeaders} />
    </div>
  );
}
