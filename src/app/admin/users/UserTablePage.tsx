"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

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
  { columnHeader: "Team ID" },
  { columnHeader: "Email" },
  { columnHeader: "" },
];

const client = generateClient<Schema>();

const UserTablePage = () => {
  // const queryClient = useQueryClient();
  const [userData, setUserData] = useState<
    Array<Partial<Schema["User"]["type"]>>
  >([]);

  const [selectedFilter, setSelectedFilter] = useState<string>("All roles");

  //Fetch the data
  const { data, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["User"],
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

      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      const formattedData = data.map((user) => ({
        lastName: user.lastName ?? "",
        firstName: user.firstName ?? "",
        role: user.role ?? "",
        teamId: user.teamId ?? "",
        email: user.email ?? "",
        id: user.id ?? "",
      }));
      setUserData(formattedData);
    }
  }, [data]);

  const applyFilters = () => {
    let newFilteredData = [];

    switch (selectedFilter) {
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

    newFilteredData = newFilteredData.filter(
      (user): user is Partial<Schema["User"]["type"]> & { id: string } =>
        user.id !== undefined,
    );
    newFilteredData.sort((a, b) => a.id.localeCompare(b.id));

    return newFilteredData;
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
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
      toast.success("✅ Table data updated succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
      });
    },
    onError: (error) => {
      console.error("Error updating table data:", error);
      toast.error("❌ Error updating table data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
      });
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
          <FilterUser onFilterChange={handleFilterChange} />
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
