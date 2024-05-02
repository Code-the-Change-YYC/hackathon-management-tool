import { useState } from "react";

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
  // Add buttons for "Edit" and "Delete" in the last column
  // <div className="flex">
  //   <button className="mr-2 px-4 py-2  text-[#7055FD] hover:text-slate-800">
  //     Edit
  //   </button>
  //   <button className="mr-2 px-4 py-2 text-[#FF4D6F] hover:text-slate-800">
  //     Delete
  //   </button>
  // </div>,
]);

export default function UserTablePage() {
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null); // initializes the state variable editRowIndex with a type annotation. It indicates that editRow can hold values of type number or null.

  const handleEditClick = (rowIndex: number) => {
    setEditRowIndex(rowIndex);
  };

  const handleSaveClick = () => {
    setEditRowIndex(null);
  };

  return (
    <div>
      <DropDownRole />
      <DataTableSection
        tableData={tableData}
        tableHeaders={tableHeaders}
        editRowIndex={editRowIndex}
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
      />
    </div>
  );
}
