import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { createTeamRoom, updateUser } from "@/amplify/graphql/mutations";
import type { Schema } from "../../../data/resource";
import {
  createRooms,
  deleteRooms,
  deleteTeamRooms,
  fetchApprovedTeams,
  fetchJudges,
  validateInput,
} from "./helpers";

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

export const client = generateClient<Schema>({
  authMode: "iam",
});

export const handler: Schema["ScheduleTeamsAndJudges"]["functionHandler"] =
  async (event) => {
    let judgingSessionsPerTeam = event.arguments.judgingSessionsPerTeam;
    let numOfJudgingRooms = event.arguments.numOfJudgingRooms;
    let presentationDuration = event.arguments.presentationDuration;
    let startDateAndTime = new Date(event.arguments.startDateAndTime);

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
    let currTime = startDateAndTime;
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
        res.forEach((result) => {
          if (result.errors) {
            console.log(result.errors);
            throw new Error("Unable to create teamRooms");
          }
        });

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
            throw new Error("Unable to update judges with roomIds");
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
