import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { v4 as uuidv4 } from "uuid";
import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import type { Schema } from "../../../data/resource";
import type { ScoreComponentTypeInput } from "./graphql/API";
import {
  createHackathon,
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

const cognitoClient = new CognitoIdentityProviderClient({});

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
      scoringComponents,
      scoringSidepots,
    } = event.arguments;
    if (safetyCheck !== "i love code the change") {
      throw new Error(
        JSON.stringify({
          statusCode: 403,
          body: { value: "Safety check failed" },
          headers: { "Content-Type": "application/json" },
        }),
      );
    }

    // Resetting Users variable
    const resettingUsers: boolean = resetUsers;
    // Reset teams if users are being reset
    const resettingTeams: boolean = resetTeams || resettingUsers;
    // Reset Rooms if teams are being reset
    const resettingRooms: boolean = resetRooms || resettingTeams;
    // Reset scores if teams are being reset
    const resettingScores: boolean = resetScores || resettingTeams;

    // Reset Users
    if (resettingUsers) {
      console.log("resetting all users");
      const { data: usersResponse, errors } = await client.graphql({
        query: listUsers,
      });

      if (errors) throw errors;

      const users = usersResponse.listUsers.items;
      for (const user of users) {
        const id = user.id;
        // only delete the participants
        if (user.role === "Participant") {
          // Delete the user from Cognito
          const deleteUserCommand = new AdminDeleteUserCommand({
            Username: id,
            UserPoolId: process.env.AMPLIFY_AUTH_USERPOOL_ID as string,
          });

          cognitoClient.send(deleteUserCommand);

          const { errors } = await client.graphql({
            query: deleteUser,
            variables: {
              input: {
                id: id,
              },
            },
          });
          if (errors) throw errors;
        }
      }
    }

    // Reset Teams
    if (resettingTeams) {
      console.log("resetting all teams");
      const { data: teamsResponse, errors } = await client.graphql({
        query: listTeams,
      });
      if (errors) throw errors;

      const teams = teamsResponse.listTeams.items;
      for (const team of teams) {
        const id = team.id;
        const { errors } = await client.graphql({
          query: deleteTeam,
          variables: {
            input: {
              id: id,
            },
          },
        });
        if (errors) throw errors;
      }
    }

    // Reset rooms
    if (resettingRooms) {
      console.log("resetting all teamRooms");
      const { data: rooms, errors } = await client.graphql({
        query: listTeamRooms,
      });
      if (errors) throw errors;
      const teamRooms = rooms.listTeamRooms.items;
      teamRooms.forEach(async (room) => {
        const id = room.id;
        const { errors } = await client.graphql({
          query: deleteTeamRoom,
          variables: {
            input: {
              id: id,
            },
          },
        });
        if (errors) throw errors;
      });
    }

    // Reset Scores
    if (resettingScores) {
      console.log("resetting all scores");
      const { data: scoresResponse, errors } = await client.graphql({
        query: listScores,
      });
      if (errors) throw errors;
      const scores = scoresResponse.listScores.items;
      for (const score of scores) {
        // teamId is the partition key
        const teamId = score.teamId;
        const judgeId = score.judgeId;
        const { errors } = await client.graphql({
          query: deleteScore,
          variables: {
            input: {
              teamId: teamId,
              judgeId: judgeId,
            },
          },
        });
        if (errors) throw errors;
      }
    }

    console.log("creating scoreComponents data");
    console.log(scoringComponents as string);

    // get the score Components Array from the JSON input
    const scoringComponentsArray: ScoreComponentTypeInput[] =
      typeof scoringComponents === "string"
        ? JSON.parse(scoringComponents)
        : scoringComponents;

    console.log("creating scoringSidepots data");
    console.log(scoringSidepots);

    const scoringSidepotsArray: ScoreComponentTypeInput[] =
      typeof scoringSidepots === "string"
        ? JSON.parse(scoringSidepots)
        : scoringSidepots;

    // get the current hackathon model data items
    const { data: hackathonItems } = await client.graphql({
      query: listHackathons,
    });
    const HackathonItems = hackathonItems.listHackathons.items;

    if (!(HackathonItems.length === 0)) {
      console.log("resetting hackathon");
      const HackathonID = HackathonItems[0].id;

      const { errors } = await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: HackathonID,
            startDate: startDate,
            endDate: endDate,
            scoringComponents: scoringComponentsArray,
            scoringSidepots: scoringSidepotsArray,
          },
        },
      });
      if (errors) throw errors;
    } else {
      console.log("creating hackathon");
      // creating new hackathon
      const HackathonID = uuidv4();

      const { errors } = await client.graphql({
        query: createHackathon,
        variables: {
          input: {
            startDate,
            endDate,
            scoringComponents: scoringComponentsArray,
            scoringSidepots: scoringSidepotsArray,
            id: HackathonID,
          },
        },
      });

      if (errors) throw errors;
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    throw new Error(
      JSON.stringify({
        statusCode: 500,
        body: { value: { error } },
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
};
