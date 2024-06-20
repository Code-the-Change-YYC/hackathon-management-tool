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

      setUserData(formattedData);
    }
  }, [data]);

  const applyFilters = () => {
    let newFilteredData = [];

    switch (selectedFilters[0]) {
      case "Admin":
        newFilteredData = userData.filter((user) => user.role === "Admin");
        break;
      case "Judge":
        newFilteredData = userData.filter((user) => user.role === "Judge");
        break;
      case "Participant":
        newFilteredData = userData.filter(
          (user) => user.role === "Participant",
        );
        break;
      default:
        newFilteredData = [...userData];
    }

    newFilteredData.sort((a, b) => a.userId.localeCompare(b.userId));

    return newFilteredData;
  };

  const handleFilterChange = (filter: string[]) => {
    setSelectedFilters(filter);
  };

  const queryClient = useQueryClient();
  const tableDataMutation = useMutation({
    mutationFn: async (updatedData: Schema["User"]["type"]) => {
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
      queryClient.invalidateQueries({ queryKey: ["User"] });
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
            tableHeaders={tableHeaders}
            userData={applyFilters()}
            tableDataMutation={tableDataMutation}
          />
        </>
      )}
    </div>
  );
};

export default UserTablePage;
