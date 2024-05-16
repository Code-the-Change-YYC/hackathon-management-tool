"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import DataTableSection from "@/app/admin/components/DataTableSection";
import FilterSection from "@/app/admin/components/FilterSection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const LOADING_SCREEN_STYLES =
  "flex h-screen w-full items-center justify-center bg-awesome-purple";

const tableHeaders = [
  { columnHeader: "Team Name", className: "w-2/5" },
  { columnHeader: "Check-in Status", className: "w-1/4" },
  { columnHeader: "Approved Status", className: "w-1/4" },
];

const filters = [{ label: "Approved" }, { label: "Checked-in" }];

const client = generateClient<Schema>();

const TeamsTablePage = () => {
  const [teamData, setTeamData] = useState<
    Array<{
      teamName: string;
      checkinStatus: string;
      members: string[];
      membersStatus: string[];
      approveStatus: string;
      teamId: string;
    }>
  >([]);

  const [tableData, setTableData] = useState<Array<Array<string>>>([]);

  const { data, isFetching } = useQuery({
    initialData: [],
    initialDataUpdatedAt: 0,
    queryKey: ["Teams"],
    queryFn: async () => {
      const response = await client.models.Team.list({
        selectionSet: ["members.*", "id", "name", "approved"],
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      const formattedData = data.map((team) => ({
        teamName: team.name ?? "",
        checkinStatus: team.members.every((member) => member.checkedIn)
          ? "Checked In"
          : "Not Checked In",
        members: team.members.map((member) =>
          member.lastName
            ? `${member.firstName} ${member.lastName}`
            : member.firstName,
        ),
        membersStatus: team.members.map((member) =>
          member.checkedIn ? "Checked In" : "Not Checked In",
        ),
        approveStatus: team.approved ? "Approved" : "Not Approved",
        teamId: team.id ?? "",
      }));

      const filteredData = formattedData.map((item) => ({
        ...item,
        members: item.members.filter((member) => member !== null) as string[],
      }));

      setTeamData(filteredData);

      const displayedData = filteredData.map((cellData) => [
        cellData.teamName,
        cellData.checkinStatus,
        cellData.approveStatus,
      ]);
      setTableData(displayedData);
    }
  }, [data]);

  const queryClient = useQueryClient();
  const tableDataMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      console.log("Updating data:", updatedData);
      try {
        const response = await client.models.Team.update(updatedData);
        return response.data;
      } catch (error) {
        console.error("Error updating table data:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Teams"] });
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
          <FilterSection topLabel="Teams" filterLabels={filters} />
          <DataTableSection
            tableData={tableData}
            tableHeaders={tableHeaders}
            showViewButton={true}
            teamData={teamData}
            tableDataMutation={tableDataMutation}
          />
        </>
      )}
    </div>
  );
};

export default TeamsTablePage;
