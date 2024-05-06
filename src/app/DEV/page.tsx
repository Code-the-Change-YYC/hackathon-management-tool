import client from "@/components/_Amplify/AmplifyBackendClient";
import * as mutations from "@/graphql/mutations";

function Dev() {
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
