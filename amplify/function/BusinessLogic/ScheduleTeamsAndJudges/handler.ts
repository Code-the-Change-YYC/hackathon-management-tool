import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import type { Schema } from "../../../data/resource";
import { deleteRoom } from "../AddUserToGroup/graphql/mutations";
import {
  createRoom,
  createTeamRoom,
  deleteTeamRoom,
  updateUser,
} from "./graphql/mutations";
import {
  listRooms,
  listTeamRooms,
  listTeams,
  listUsers,
} from "./graphql/queries";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT as string,
        region: process.env.AWS_REGION,
        defaultAuthMode: "iam",
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            sessionToken: process.env.AWS_SESSION_TOKEN as string,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  },
);

const InternalError = JSON.stringify({
  body: {
    value: "Unable to create schedule",
  },
  statusCode: 500,
  headers: { "Content-Type": "application/json" },
});

const client = generateClient<Schema>({
  authMode: "iam",
});

export const handler: Schema["ScheduleTeamsAndJudges"]["functionHandler"] =
  async (event) => {
    let judgingSessionsPerTeam = event.arguments.judgingSessionsPerTeam;
    let numOfJudgingRooms = event.arguments.numOfJudgingRooms;
    let presentationDuration = 15; // TODO: make this an input into the lambda
    let startTime = new Date("2024-01-01T13:00:00"); // TODO: make this an input into the lambda

    // Fetch Approved teams
    const teams = await fetchApprovedTeams().catch(() => {
      throw new Error(InternalError);
    });

    // Input validation
    validateInput(judgingSessionsPerTeam, numOfJudgingRooms, teams.length);

    // Delete existing rooms and teamRooms
    await Promise.all([deleteRooms(), deleteTeamRooms()]).catch((error) => {
      console.log(error);
      throw new Error(InternalError);
    });

    // Create empty rooms
    const roomIds = await createRooms(numOfJudgingRooms).catch(() => {
      throw new Error(InternalError);
    });

    let totalSessions = teams.length * judgingSessionsPerTeam;
    let numberOfRows = Math.ceil(totalSessions / numOfJudgingRooms);
    let numberOfColumns = numOfJudgingRooms;
    let teamIndex = 0;
    let currTime = startTime;
    let createTeamRoomRequests = [];
    let schedulingMatrix: string[][] = [];
    for (let i = 0; i < numberOfRows; i++) {
      schedulingMatrix.push(new Array(numberOfColumns).fill(null));
    }

    // Populate the scheduling matrix with the teams
    // Each team will only appear once in each column and each row
    for (let row = 0; row < numberOfRows; row++) {
      for (let column = 0; column < numberOfColumns; column++) {
        let curSessionIndex = row * numberOfColumns + column;
        if (curSessionIndex >= totalSessions) {
          break;
        }

        // If the team has already appeared in a column (i.e. judging room), skip over the team.
        let isStartOfNewCount = curSessionIndex % teams.length === 0;
        if (
          isStartOfNewCount &&
          schedulingMatrix.findIndex(
            (row: string[]) => row[column] === teams[teamIndex].id,
          ) !== -1
        ) {
          teamIndex = (teamIndex + 1) % teams.length;
        }

        schedulingMatrix[row][column] = teams[teamIndex].id;
        createTeamRoomRequests.push(
          client.graphql({
            query: createTeamRoom,
            variables: {
              input: {
                teamId: teams[teamIndex].id,
                time: currTime.toISOString(),
                roomId: roomIds[column],
                zoomLink: "",
              },
            },
          }),
        );
        teamIndex = (teamIndex + 1) % teams.length;
      }
      // Increment time for the next set of judging sessions
      currTime = new Date(currTime.getTime() + presentationDuration * 60000);
    }

    // Create all the team rooms
    await Promise.all(createTeamRoomRequests)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].errors) {
            console.log(res[i].errors);
            throw new Error();
          }
        }
        return "Created Rooms";
      })
      .catch((error) => {
        console.log("unable to create teamRooms" + error);
        throw new Error(InternalError);
      });

    // Fetch and Assign judges to judging rooms
    const judges = await fetchJudges();

    const updateJudgeRequests = [];
    for (let i = 0; i < judges.length; i++) {
      updateJudgeRequests.push(
        client.graphql({
          query: updateUser,
          variables: {
            input: {
              id: judges[i].id,
              JUDGE_roomId: roomIds[i % numOfJudgingRooms],
            },
          },
        }),
      );
    }

    // Update all judges with the roomIds
    await Promise.all(updateJudgeRequests)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].errors) {
            console.log(res[i].errors);
            throw new Error();
          }
        }
        return "Updates Judges";
      })
      .catch((error) => {
        console.log(error);
        throw new Error(InternalError);
      });

    return {
      body: {},
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
    };
  };

async function deleteRooms() {
  const response = await client.graphql({ query: listRooms });
  if (response.errors) {
    return Promise.reject("Error fetching existing rooms");
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
      return Promise.reject(
        `Error deleting room with Id: ${roomsToDelete[i].id}`,
      );
    }
  }

  return Promise.resolve("All rooms deleted successfully");
}

async function deleteTeamRooms() {
  const response = await client.graphql({ query: listTeamRooms });
  if (response.errors) {
    return Promise.reject("Error fetching existing team rooms");
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
      return Promise.reject(
        `Error deleting teamRoom with Id: ${teamRoomsToDelete[i].id}`,
      );
    }
  }

  return Promise.resolve("All teamRooms deleted successfully");
}

function validateInput(
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

async function fetchApprovedTeams() {
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

async function createRooms(numRooms: number) {
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

async function fetchJudges() {
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
