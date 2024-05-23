"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import DataTableSection from "@/app/admin/components/DataTableSection";
import DropDownRole from "@/app/admin/components/DropDownRole";
import { useQuery } from "@tanstack/react-query";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-awesome-purple";

// const users = [
//   {
//     lastName: "Last",
//     firstName: "First",
//     role: "Participant",
//     team: "Group Name",
//     email: "email@ucalgary.ca",
//   },
//   {
//     lastName: "Last",
//     firstName: "First",
//     role: "Judge",
//     team: "",
//     email: "email@ucalgary.ca",
//   },
//   {
//     lastName: "Last",
//     firstName: "First",
//     role: "Participant",
//     team: "Group Name",
//     email: "email@ucalgary.ca",
//   },
//   {
//     lastName: "Last",
//     firstName: "First",
//     role: "Judge",
//     team: "",
//     email: "email@ucalgary.ca",
//   },
//   {
//     lastName: "Last",
//     firstName: "First",
//     role: "Participant",
//     team: "Group Name",
//     email: "email@ucalgary.ca",
//   },
// ] as const;

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Last Name", className: "w-1/6" },
  { columnHeader: "First Name", className: "w-1/6" },
  { columnHeader: "Email", className: "w-1/6" },
  { columnHeader: "Role", className: "w-1/6" },
  { columnHeader: "Team", className: "w-1/6" },
  { columnHeader: "", className: "w-1/3" },
];

// const tableData = users.map((user) => [
//   user.lastName,
//   user.firstName,
//   user.role,
//   user.team,
//   user.email,
// ]);

const client = generateClient<Schema>();

const UserTablePage = () => {
  // const queryClient = useQueryClient();
  const [userData, setUserData] = useState<
    Array<{
      lastName: string;
      firstName: string;
      role: string;
      team: string;
      email: string;
    }>
  >([]);

  const [tableData, setTableData] = useState<string[][]>([]);

  //Fetch the data
  const { data, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["Users"],
    queryFn: async () => {
      const response = await client.models.User.list({
        selectionSet: ["lastName", "firstName", "team.name", "email"], // need role - ask Ideen
      });
      console.log(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      const formattedData = data.map((user) => ({
        lastName: user.lastName ?? "",
        firstName: user.firstName ?? "",
        role: "Participant" ?? "Judge" ?? "", // need role - ask Ideen? OR user.role ?? "Participant" ?? "Judge" ?? "",
        team: user.team.name ?? "",
        email: user.email ?? "",
      }));

      //Create an array to
      const removeNullData = formattedData.map((item) => ({
        ...item,
      }));

      setUserData(removeNullData);

      //Create an array to display the data in the Data Table

      const displayedData = removeNullData.map((cellData) => [
        cellData.lastName,
        cellData.firstName,
        cellData.role,
        cellData.team,
        cellData.email,
      ]);

      setTableData(displayedData);
    }
  }, [data]);

  return (
    <div>
      {isFetching ? (
        <div className={LOADING_SCREEN_STYLES}>
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <>
          <DropDownRole />
          <DataTableSection
            tableData={tableData}
            tableHeaders={tableHeaders}
            userData={userData}
          />
        </>
      )}
    </div>
  );
};

export default UserTablePage;
