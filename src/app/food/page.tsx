// app/food/page.tsx
import Verification from "@/components/Food/Verification";
// import client from "@/components/_Amplify/AmplifyBackendClient";
// import * as mutations from "@/graphql/mutations";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";

export default async function FoodPage() {
  const userVerificationCode = null;
  const inputUserCode = null;

  async function currentAuthenticatedUser() {
    try {
      const user = await AuthGetCurrentUserServer()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          console.error(err);
        });

      if (user) {
        // const response = await client.graphql({
        //   query: mutations.getFoodTicket,
        //   variables: {
        //     userID: user.userId,
        //   },
        // });
      }
    } catch (err) {
      console.log(err);
    }
  }

  await currentAuthenticatedUser();

  return (
    <div>
      <button>test</button>
      <Verification></Verification>
      <br />
      <a> {userVerificationCode}</a>
      <a>{inputUserCode}</a>
    </div>
  );
}
