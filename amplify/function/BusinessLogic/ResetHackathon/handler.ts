import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import type { Schema } from "../../../data/resource";
import type { ScoreComponentTypeInput } from "./graphql/API";
import {
  deleteScore,
  deleteTeam,
  deleteTeamRoom,
  deleteUser,
  updateHackathon,
} from "./graphql/mutations";
import {
  listHackathons,
  listScores,
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

const client = generateClient<Schema>({
  authMode: "iam",
});

type Handler = Schema["ResetHackathon"]["functionHandler"];

export const handler: Handler = async (event) => {
  try {
    // Extract arguments from the event if any
    const {
      safetyCheck,
      resetRooms,
      resetScores,
      resetTeams,
      resetUsers,
      startDate,
      endDate,
      scoreComponents,
      scoringSidepots,
    } = event.arguments;
    if (safetyCheck !== "deletehackathon") {
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
      };
    }
    // hackathon-related data
    const hackathonData = await client.graphql({
      query: listHackathons,
    });
    const HackathonItems = hackathonData.data.listHackathons.items;

    // Assuming there is only 1 Hackathon
    if (HackathonItems.length === 0) {
      console.log("Not a single Hackathon, please create one");
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
      };
    }
    // Assuming the first Hackathon is the right one
    const HackathonID = HackathonItems[0].id;

    // Resetting Users variable
    const resettingUsers: boolean = resetUsers ?? false;
    // Reset teams if users are being reset
    const resettingTeams: boolean = (resetTeams ?? false) || resettingUsers;
    // Reset Rooms if teams are being reset
    const resettingRooms: boolean = (resetRooms ?? false) || resettingTeams;
    // Reset scores if teams are being reset
    const resettingScores: boolean = (resetScores ?? false) || resettingTeams;

    // Reset Users
    if (resettingUsers) {
      console.log("resetting all users");
      const usersResponse = await client.graphql({
        query: listUsers,
      });
      const users = usersResponse.data.listUsers.items;
      for (const user of users) {
        const id = user.id;
        // only delete the participants
        if (user.role === "Participant") {
          await client.graphql({
            query: deleteUser,
            variables: {
              input: {
                id: id,
              },
            },
          });
        }
      }
    }

    // Reset Teams
    if (resettingTeams) {
      console.log("resetting all teams");
      const teamsResponse = await client.graphql({
        query: listTeams,
      });
      const teams = teamsResponse.data.listTeams.items;
      for (const team of teams) {
        const id = team.id;
        await client.graphql({
          query: deleteTeam,
          variables: {
            input: {
              id: id,
            },
          },
        });
      }
    }

    // Reset rooms
    if (resettingRooms) {
      console.log("resetting all teamRooms");
      const teamRooms = (
        await client.graphql({
          query: listTeamRooms,
        })
      ).data.listTeamRooms.items;
      teamRooms.forEach(async (room) => {
        const id = room.id;
        await client.graphql({
          query: deleteTeamRoom,
          variables: {
            input: {
              id: id,
            },
          },
        });
      });
    }

    // Reset Scores
    if (resettingScores) {
      console.log("resetting all scores");
      const scoresResponse = await client.graphql({
        query: listScores,
      });
      const scores = scoresResponse.data.listScores.items;
      for (const score of scores) {
        const id = score.id;
        await client.graphql({
          query: deleteScore,
          variables: {
            input: {
              id: id,
            },
          },
        });
      }
    }

    // Edit start date
    if (startDate) {
      console.log("editing start date");
      await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: HackathonID,
            startDate: startDate,
          },
        },
      });
    }

    // Edit end date
    if (endDate) {
      console.log("editing end date");
      await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: HackathonID,
            endDate: endDate,
          },
        },
      });
    }

    // edit the scoringComponents
    if (scoreComponents) {
      console.log("editing scoreComponents data");
      console.log(scoreComponents as string);

      // get the score Components Array from the JSON input
      const scoreComponentsArray: ScoreComponentTypeInput[] =
        typeof scoreComponents === "string"
          ? JSON.parse(scoreComponents)
          : scoreComponents;
      await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: HackathonID,
            scoringComponents: scoreComponentsArray,
          },
        },
      });
    }

    // edit the scoringSidepots
    if (scoringSidepots) {
      console.log("editing scoringSidepots data");
      console.log(scoringSidepots);

      // get the score side pots Array from the JSON input
      const scoringSidepotsArray: ScoreComponentTypeInput[] =
        typeof scoringSidepots === "string"
          ? JSON.parse(scoringSidepots)
          : scoringSidepots;
      await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: HackathonID,
            scoringSidepots: scoringSidepotsArray,
          },
        },
      });
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error resetting hackathon:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    };
  }
};
