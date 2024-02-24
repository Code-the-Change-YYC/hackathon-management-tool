import { generateClient } from "aws-amplify/data";

import { type Schema } from "@/amplify/data/resource";
import * as mutations from "@/graphql/mutations";

function Dev() {
  const client = generateClient<Schema>();

  async function callDemoFunction() {
    const response = await client.graphql({
      query: mutations.DemoFunction,
      variables: {
        content: "Echo me!",
      },
    });

    console.log(response.data.DemoFunction?.body);
    console.log(response.data.DemoFunction?.statusCode);
  }
  void callDemoFunction();
  return (
    <div>
      <h1>This page is only to do backend Dev work</h1>
    </div>
  );
}

export default Dev;
