"use client";

import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { UserType } from "@/components/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import DataTableSectionUser from "../components/DataTableSectionUser";
import FilterUser from "../components/FilterUser";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-awesome-purple";

const tableHeaders = [
  { columnHeader: "Last Name" },
  { columnHeader: "First Name" },
  { columnHeader: "Role" },
  { columnHeader: "Team ID" },
  { columnHeader: "Email" },
  { columnHeader: "" },
];

const client = generateClient<Schema>();

const UserTablePage = () => {
  const [filteredData, setFilteredData] = useState<
    Array<Partial<Schema["User"]["type"]>>
  >([]);

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
          "teamId",
          "email",
          "id",
        ],
      });

      // Set the initial filtered data to the response data
      setFilteredData(response.data);

      return response.data;
    },
  });

  const handleFilterChange = (filter: string) => {
    let newFilteredData = [];

    switch (filter) {
      case UserType.Admin:
        newFilteredData = data.filter((user) => user.role === UserType.Admin);
        break;
      case UserType.Judge:
        newFilteredData = data.filter((user) => user.role === UserType.Judge);
        break;
      case UserType.Participant:
        newFilteredData = data.filter(
          (user) => user.role === UserType.Participant,
        );
        break;
      default:
        newFilteredData = [...data];
    }

    newFilteredData.sort((a, b) => a.id.localeCompare(b.id));

    setFilteredData(newFilteredData);
  };

  return (
    <div>
      {isFetching ? (
        <div className={LOADING_SCREEN_STYLES}>
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <>
          <FilterUser onFilterChange={handleFilterChange} />
          <DataTableSectionUser
            tableHeaders={tableHeaders}
            userData={filteredData}
          />
        </>
      )}
    </div>
  );
};

export default UserTablePage;
