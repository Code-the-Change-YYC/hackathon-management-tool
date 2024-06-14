"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTableSectionUser from "../components/DataTableSectionUser";
import FilterUser from "../components/FilterUser";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-awesome-purple";

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Last Name" },
  { columnHeader: "First Name" },
  { columnHeader: "Role" },
  { columnHeader: "Team" },
  { columnHeader: "Email" },
  { columnHeader: "" },
];

const filters = [
  { label: "All roles" },
  { label: "Admin" },
  { label: "Judge" },
  { label: "Participant" },
];

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
      userId: string;
    }>
  >([]);

  const [tableData, setTableData] = useState<string[][]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  //Fetch the data
  const { data, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["Users"],
    queryFn: async () => {
      const response = await client.models.User.list({
        selectionSet: [
          "lastName",
          "firstName",
          "role",
          "allergies",
          "email",
          "id",
        ],
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
        role: user.role ?? "",
        team: user.allergies ?? "",
        email: user.email ?? "",
        userId: user.id ?? "",
      }));

      // //Create an array to
      // const removeNullData = formattedData.map((item) => ({
      //   ...item,
      // }));
      // console.log(userData);

      setUserData(formattedData);

      //Create an array to display the data in the Data Table

      const displayedData = formattedData.map((cellData) => [
        cellData.lastName,
        cellData.firstName,
        cellData.role,
        cellData.team,
        cellData.email,
        cellData.userId,
      ]);

      console.log(displayedData);

      setTableData(displayedData);
    }
  }, [data]);

  const applyFilters = () => {
    let newFilteredData = [];

    switch (selectedFilters[0]) {
      case "Admin":
        newFilteredData = tableData.filter((row) => row[2] === "Admin");
        break;
      case "Judge":
        newFilteredData = tableData.filter((row) => row[2] === "Judge");
        break;
      case "Participant":
        newFilteredData = tableData.filter((row) => row[2] === "Participant");
        break;
      default:
        newFilteredData = [...tableData];
    }

    newFilteredData.sort((a, b) => a[0].localeCompare(b[0]));

    return newFilteredData;
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
    applyFilters();
  };

  const queryClient = useQueryClient();
  const tableDataMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      console.log("Updating data:", updatedData);
      try {
        const response = await client.models.User.update(updatedData);
        return response.data;
      } catch (error) {
        console.error("Error updating table data:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      console.log("Table data updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating table data:", error);
    },
  });

  return (
    <div>
      {isFetching ? (
        <div className={LOADING_SCREEN_STYLES}>
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <>
          <FilterUser
            filterLabels={filters}
            onFilterChange={handleFilterChange}
          />
          <DataTableSectionUser
            tableData={applyFilters()}
            tableHeaders={tableHeaders}
            userData={userData}
            tableDataMutation={tableDataMutation}
          />
        </>
      )}
    </div>
  );
};

export default UserTablePage;
