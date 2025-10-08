import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { createHackathon, updateHackathon } from "@/amplify/graphql/mutations";
import { listHackathons } from "@/amplify/graphql/queries";
import type { Schema } from "../../../data/resource";

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

type Handler = Schema["StartHackathon"]["functionHandler"];

export const handler: Handler = async (event) => {
  try {
    const { startDate, endDate } = event.arguments;

    const { data: hackathonItems } = await client.graphql({
      query: listHackathons,
    });

    const existingHackathons = hackathonItems?.listHackathons?.items || [];

    if (existingHackathons.length > 0) {
      const hackathonId = existingHackathons[0].id;

      const { errors } = await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: hackathonId,
            startDate: startDate,
            endDate: endDate,
          },
        },
      });

      if (errors) throw errors;

      console.log(
        `Hackathon updated to start on ${startDate} and end on ${endDate}`,
      );
    } else {
      const { errors } = await client.graphql({
        query: createHackathon,
        variables: {
          input: {
            id: "1",
            startDate: startDate,
            endDate: endDate,
            scoringComponents: [],
            scoringSidepots: [],
          },
        },
      });

      if (errors) throw errors;

      console.log(
        `Hackathon created and scheduled to start on ${startDate} and end on ${endDate}`,
      );
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error scheduling hackathon start:", error);
    throw new Error(
      `Failed to schedule hackathon start: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
