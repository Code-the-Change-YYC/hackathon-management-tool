"use client";

import { generateClient } from "aws-amplify/data";

import { type Schema } from "@/amplify/data/resource";

// eslint-disable-next-line no-restricted-imports
import TeamsTablePage from "./TeamsTablePage";

export default function Teams() {
  /*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

  const client = generateClient<Schema>(); // use this Data client for CRUDL requests

  /*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

  /* For example, in a React component, you can use this snippet in your
  function's RETURN statement */

  client.models.Team?.list()
    .then((teams) => {
      console.log(teams);
      return;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <main className="w-full bg-medium-grey">
      <TeamsTablePage />
    </main>
  );
}
