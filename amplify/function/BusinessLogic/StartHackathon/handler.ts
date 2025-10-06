import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../data/resource";

import { updateHackathon } from "@/amplify/graphql/mutations";
import { listHackathons } from "@/amplify/graphql/queries";

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

    // Fetch the current hackathon
    const { data: hackathonItems } = await client.graphql({
      query: listHackathons,
    });

    if (!hackathonItems || hackathonItems.listHackathons.items.length === 0) {
      throw new Error("No hackathon found to start");
    }

    const hackathon = hackathonItems.listHackathons.items[0];
    const hackathonId = hackathon.id;

    // Update hackathon with new start and end dates
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

    // We'll use AWS console and schedule instead of EventBridge for simplicity
    // For a full implementation with EventBridge, the AWS SDK would need to be properly
    // configured in the project

    return {
      statusCode: 200,
      body: {
        message: `Hackathon scheduled to start on ${startDate} and end on ${endDate}`,
      },
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error scheduling hackathon start:", error);
    throw new Error(
      JSON.stringify({
        statusCode: 500,
        body: { error: `Failed to schedule hackathon start: ${error}` },
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
};
