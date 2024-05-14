"use client";

import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import DataTableSection from "@/app/admin/components/DataTableSection";
import FilterSection from "@/app/admin/components/FilterSection";

const tableHeaders = [
  { columnHeader: "Team Name", className: "w-2/5" },
  { columnHeader: "Check-in Status", className: "w-1/4" },
  // { columnHeader: "Check-in Status", className: "w-1/5" },
];

const filters = [{ label: "Approved" }, { label: "Checked-in" }];

const client = generateClient<Schema>();

const TeamsTablePage = () => {
  const [membersData, setMembersData] = useState<
    Array<{
      teamName: string;
      checkinStatus: string;
      members: string[];
      membersStatus: string[];
      teamId: string;
    }>
  >([]);
  const [tableData, setTableData] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamsData = await client.models.Team.list();
      const formattedData = [];

      for (const team of teamsData.data) {
        const membersResponse = await team.members();
        const members = membersResponse.data;

        const teamCheckinStatus = members.every((member) => member.checkedIn)
          ? "Checked In"
          : "Not Checked In";

        const memberNames = members.map((member) => {
          if (member.lastName) {
            return `${member.firstName} ${member.lastName}`;
          } else {
            return `${member.firstName}`;
          }
        });

        const memberStatus = members.map((member) =>
          member.checkedIn ? "Checked In" : "Not Checked In",
        );

        const teamData = {
          teamName: team.name,
          checkinStatus: teamCheckinStatus,
          members: memberNames,
          membersStatus: memberStatus,
          teamId: team.id,
        };

        formattedData.push(teamData);
      }
      return formattedData;
    };

    fetchTeamData()
      .then((data) => {
        setMembersData(
          data as Array<{
            teamName: string;
            checkinStatus: string;
            members: string[];
            membersStatus: string[];
            teamId: string;
          }>,
        );

        const displayedData = data.map((cellData) => [
          cellData.teamName,
          cellData.checkinStatus,
        ]);
        setTableData(displayedData as Array<Array<string>>);
        return;
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, []);
  return (
    <div>
      <FilterSection topLabel="Teams" filterLabels={filters} />
      <DataTableSection
        tableData={tableData}
        tableHeaders={tableHeaders}
        showViewButton={true}
        membersData={membersData}
      />
    </div>
  );
};

export default TeamsTablePage;
