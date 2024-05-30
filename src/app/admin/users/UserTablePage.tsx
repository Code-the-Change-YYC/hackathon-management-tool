"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import DataTableSection from "@/app/admin/components/DataTableSection";
import FilterUserRole from "@/app/admin/components/FilterUserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-awesome-purple";

// added option for styles to customize the column widths
const tableHeaders = [
  { columnHeader: "Last Name", className: "w-1/6" },
  { columnHeader: "First Name", className: "w-1/6" },
  { columnHeader: "Role", className: "w-1/6" },
  { columnHeader: "Team", className: "w-1/6" },
  { columnHeader: "Email", className: "w-1/6" },
  { columnHeader: "", className: "w-1/3" },
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
  const [filteredData, setFilteredData] = useState<string[][]>([]);
  const [selectedFilterRole, setSelectedFilterRole] = useState<string[]>([]);

  //Fetch the data
  const { data, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["Users"],
    queryFn: async () => {
      const response = await client.models.User.list({
        selectionSet: ["lastName", "firstName", "team.name", "email", "id"], // need role - ask Ideen
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
        role: "Participant" ?? "", // Do I need to create an empty a
        team: user.team.name ?? "",
        email: user.email ?? "",
        userId: user.id ?? "",
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
      setFilteredData(displayedData);
    }
  }, [data]);

  useEffect(() => {
    const applyFilters = () => {
      let newFilteredData = tableData;
      if (selectedFilterRole.includes("All roles")) {
        newFilteredData = tableData;
        console.log("All roles selected");
      } else if (selectedFilterRole.includes("Admin")) {
        newFilteredData = newFilteredData.filter((row) => row[2] === "Admin");
        console.log("Admin selected");
      } else if (selectedFilterRole.includes("Judge")) {
        newFilteredData = newFilteredData.filter((row) => row[2] === "Judge");
        console.log("Judge selected");
      } else if (selectedFilterRole.includes("Participant")) {
        newFilteredData = newFilteredData.filter(
          (row) => row[2] === "Participant",
        );
        console.log("Participant selected");
      }
      newFilteredData.sort((a, b) => a[0].localeCompare(b[0]));
      setFilteredData(newFilteredData);
    };

    applyFilters();
  }, [selectedFilterRole, tableData]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilterRole(filters);
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
          <FilterUserRole
            filterRoles={filters}
            onFilterRolesChange={handleFilterChange}
          />
          <DataTableSection
            tableData={filteredData}
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
