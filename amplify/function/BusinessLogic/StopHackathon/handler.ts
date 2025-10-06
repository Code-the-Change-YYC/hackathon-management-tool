import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { updateHackathon } from "@/amplify/graphql/mutations";
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

type Handler = Schema["StopHackathon"]["functionHandler"];

export const handler: Handler = async (event) => {
  try {
    const { stopDate } = event.arguments;

    // Fetch the current hackathon
    const { data: hackathonItems } = await client.graphql({
      query: listHackathons,
    });

    if (!hackathonItems || hackathonItems.listHackathons.items.length === 0) {
      throw new Error("No hackathon found to stop");
    }

    const hackathon = hackathonItems.listHackathons.items[0];
    const hackathonId = hackathon.id;

    // If stopDate is provided, we're scheduling a future stop; otherwise, stop immediately
    if (stopDate) {
      // For a full implementation with EventBridge, the AWS SDK would need to be properly
      // configured in the project. For now, we'll just update the hackathon end date.

      // Update hackathon with new end date
      const { errors } = await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: hackathonId,
            endDate: stopDate,
          },
        },
      });

      if (errors) throw errors;

      return {
        statusCode: 200,
        body: { message: `Hackathon scheduled to stop on ${stopDate}` },
        headers: { "Content-Type": "application/json" },
      };
    } else {
      // Stop the hackathon immediately by updating the end date to now
      const now = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

      const { errors } = await client.graphql({
        query: updateHackathon,
        variables: {
          input: {
            id: hackathonId,
            endDate: now,
          },
        },
      });

      if (errors) throw errors;

      return {
        statusCode: 200,
        body: { message: "Hackathon stopped successfully" },
        headers: { "Content-Type": "application/json" },
      };
    }
  } catch (error) {
    console.error("Error stopping hackathon:", error);
    throw new Error(
      JSON.stringify({
        statusCode: 500,
        body: { error: `Failed to stop hackathon: ${error}` },
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
};
