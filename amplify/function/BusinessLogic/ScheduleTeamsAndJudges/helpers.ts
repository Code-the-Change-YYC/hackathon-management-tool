import { deleteRoom } from "../AddUserToGroup/graphql/mutations";
import { createRoom, deleteTeamRoom } from "./graphql/mutations";
import {
  listRooms,
  listTeamRooms,
  listTeams,
  listUsers,
} from "./graphql/queries";
import { client } from "./handler";

export async function deleteRooms() {
  const response = await client.graphql({ query: listRooms });
  if (response.errors) {
    throw new Error("Error fetching existing rooms");
  }
  const roomsToDelete = response.data.listRooms.items;

  // Perform deletion using GraphQL
  const roomDeletionResult = await Promise.all(
    roomsToDelete.map((room) => {
      return client.graphql({
        query: deleteRoom,
        variables: { input: { id: room.id } },
      });
    }),
  );

  // Check for errors in the deletion process
  for (let i = 0; i < roomDeletionResult.length; i++) {
    const result = roomDeletionResult[i];
    if (result.errors) {
      throw new Error(`Error deleting room with Id: ${roomsToDelete[i].id}`);
    }
  }

  return Promise.resolve("All rooms deleted successfully");
}
export async function deleteTeamRooms() {
  const response = await client.graphql({ query: listTeamRooms });
  if (response.errors) {
    throw new Error("Error fetching existing team rooms");
  }
  const teamRoomsToDelete = response.data.listTeamRooms.items;

  // Perform deletion using GraphQL
  const teamRoomDeletionResult = await Promise.all(
    teamRoomsToDelete.map((room) => {
      return client.graphql({
        query: deleteTeamRoom,
        variables: { input: { id: room.id } },
      });
    }),
  );

  // Check for errors in the deletion process
  for (let i = 0; i < teamRoomDeletionResult.length; i++) {
    const result = teamRoomDeletionResult[i];
    if (result.errors) {
      throw new Error(
        `Error deleting teamRoom with Id: ${teamRoomsToDelete[i].id}`,
      );
    }
  }

  return Promise.resolve("All teamRooms deleted successfully");
}
export function validateInput(
  judgingSessionsPerTeam: number,
  numOfJudgingRooms: number,
  numTeams: number,
) {
  if (judgingSessionsPerTeam > numOfJudgingRooms) {
    throw new Error(
      JSON.stringify({
        body: {
          value:
            "Cannot have more judging sessions than there are judging rooms",
        },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  if (numOfJudgingRooms > numTeams && judgingSessionsPerTeam > 1) {
    throw new Error(
      JSON.stringify({
        body: {
          value: "Not enough teams and too many judges",
        },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
}
export async function fetchApprovedTeams() {
  const teamsResponse = await client.graphql({
    query: listTeams,
    variables: {
      filter: {
        approved: { eq: true },
      },
    },
  });
  if (teamsResponse.errors) {
    console.log("error fetching approved teams");
    throw new Error("error fetching approved teams");
  }
  return teamsResponse.data.listTeams.items;
}
export async function createRooms(numRooms: number) {
  const createRoomRequests = Array.from({ length: numRooms }, (_, i) => {
    return client.graphql({
      query: createRoom,
      variables: {
        input: {
          name: `Room ${i + 1}`,
        },
      },
    });
  });
  const createRoomsResult = await Promise.all(createRoomRequests).catch(
    (error) => {
      console.log(error);
      throw new Error("unable to create rooms");
    },
  );

  let roomIds: string[] = [];
  for (let i = 0; i < createRoomsResult.length; i++) {
    const result = createRoomsResult[i];
    if (result.errors) {
      console.log(result.errors);
      throw new Error("unable to create rooms");
    }
    roomIds.push(result.data.createRoom.id);
  }

  return roomIds;
}
export async function fetchJudges() {
  const judgesResponse = await client
    .graphql({
      query: listUsers,
      variables: {
        filter: {
          role: { eq: "JUDGE" },
        },
      },
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Unable to fetch judges");
    });

  if (judgesResponse.errors) {
    console.log(judgesResponse.errors);
    throw new Error("Unable to fetch judges");
  }

  return judgesResponse.data.listUsers.items;
}
