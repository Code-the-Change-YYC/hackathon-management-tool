import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import type { Schema } from "../../../data/resource";
import { listTeams, listUsers } from "./graphql/queries";

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

const client = generateClient<Schema>({
  authMode: "iam",
});

export const handler: Schema["ScheduleTeamsAndJudges"]["functionHandler"] =
  async (event) => {
    var judgingSessionsPerTeam = event.arguments.judgingSessionsPerTeam;
    var numOfJudgingRooms = event.arguments.numOfJudgingRooms;

    console.log("judgingSessionsPerTeam: ", judgingSessionsPerTeam);
    let teams = null;
    try {
      teams = await client.graphql({
        query: listTeams,
        variables: {
          filter: {
            approved: { eq: true },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching teams: ", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    var numOfTeams = teams.data.listTeams.items.length;

    if (judgingSessionsPerTeam > numOfJudgingRooms) {
      return {
        body: {
          value: "Cannot have more judging sessions than there are judges",
        },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      };
    }

    if (numOfJudgingRooms > numOfTeams && judgingSessionsPerTeam > 1) {
      return {
        body: {
          value: "Not enough teams and too many judges",
        },
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      };
    }

    let totalSessions = numOfTeams * judgingSessionsPerTeam;
    let numberOfRows = Math.ceil(totalSessions / numOfJudgingRooms);
    let numberOfColumns = numOfJudgingRooms;
    let schedulingMatrix = new Array(numberOfRows).map(() =>
      new Array(numberOfColumns).fill(null),
    );

    let teamNumber = 0;

    const alreadyExistsInColumn = (
      target: number,
      columnIndex: number,
      matrix: number[][],
    ): boolean => {
      return (
        matrix.findIndex((row: number[]) => row[columnIndex] === target) !== -1
      );
    };

    // Populate the scheduling matrix with team numbers
    // Each team number will only appear once in each column and each row
    for (var row = 0; row < numberOfRows; row++) {
      for (var column = 0; column < numberOfColumns; column++) {
        let curSessionIndex = row * numberOfColumns + column;
        if (curSessionIndex >= totalSessions) {
          break;
        }

        // If the team has already appeared in a column (i.e. judging room), skip over the team.
        let isStartOfNewCount = curSessionIndex % numOfTeams === 0;
        if (
          isStartOfNewCount &&
          alreadyExistsInColumn(teamNumber, column, schedulingMatrix)
        ) {
          teamNumber = (teamNumber + 1) % numOfTeams;
        }

        schedulingMatrix[row][column] = teamNumber;
        teamNumber = (teamNumber + 1) % numOfTeams;
      }
    }

    // Convert team numbers to team IDs
    schedulingMatrix.map((row) =>
      row.map((teamNumber) => teams.data.listTeams.items[teamNumber].id),
    );

    let judges = await client.graphql({
      query: listUsers,
      variables: {
        filter: {
          role: { eq: "JUDGE" },
        },
      },
    });

    let judgingRooms = new Array(numOfJudgingRooms);

    for (var i = 0; i < judges.data.listUsers.items.length; i++) {
      judgingRooms[i % numOfJudgingRooms].push(judges.data.listUsers.items[i]);
    }

    return {
      body: {
        judges: judgingRooms,
        schedule: schedulingMatrix,
      },
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  };
