import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncIdentityCognito } from "aws-lambda";

import type { Schema } from "../../../data/resource";
import { listHackathons } from "./graphql/queries";

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
    console.log(event.arguments);
    if (safetyCheck !== "deletehackathon") {
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
      };
    }
    // hackathon-related data
    const hackathonData = (
      await client.graphql({
        query: listHackathons,
      })
    ).data.listHackathons.items[0];

    // Resetting Users variable
    const resettingUsers: boolean = resetUsers ?? false;
    // Reset teams if users are being reset
    const resettingTeams: boolean = resetTeams || resettingUsers;
    // Reset Rooms if teams are being reset
    const resettingRooms: boolean = resetRooms || resettingTeams;
    // Reset scores if teams are being reset
    const resettingScores: boolean = resetScores || resettingTeams;

    // Reset rooms
    if (resettingRooms) {
      console.log("resetting all teamRooms");
      const teamRooms = (await client.models.TeamRoom.list()).data;
      teamRooms.forEach((room) => {
        const id = room.id;
        client.models.TeamRoom.delete({ id: id });
      });
    }

    // Reset Scores
    if (resettingScores) {
      console.log("resetting all resetScores");

      const scores = (await client.models.Score.list()).data;
      scores.forEach((score) => {
        const id = score.id;
        client.models.Score.delete({ id: id });
      });
    }

    // Reset Users
    if (resettingUsers) {
      console.log("resetting all resetUsers");

      const users = (await client.models.User.list()).data;
      users.forEach((user) => {
        const id = user.id;
        const role = user.role;
        if (role === "Participant") {
          client.models.User.delete({ id: id });
        }
      });
    }

    // Reset Teams
    if (resetTeams) {
      console.log("resetting all resetTeams");

      const teams = (await client.models.Team.list()).data;
      teams.forEach((team) => {
        const id = team.id;
        client.models.Team.delete({ id: id });
      });
    }

    // Edit start date
    if (startDate) {
      console.log("editting startDate");

      client.models.Hackathon.update({
        id: hackathonData.id,
        startDate: startDate,
      });
    }

    // Edit end date
    if (endDate) {
      console.log("editting endDate");

      client.models.Hackathon.update({
        id: hackathonData.id,
        endDate: endDate,
      });
    }

    // Edit scoring component
    if (scoreComponents) {
      console.log("editting scoreComponents");
      console.log(scoreComponents);
      console.log(typeof scoreComponents);
    }
    // Edit side pots

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
