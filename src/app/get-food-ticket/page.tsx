// app/food/page.tsx
import Verification from "@/components/Food/TicketVerificationSubmit";
import client from "@/components/_Amplify/AmplifyBackendClient";
import * as mutations from "../../../mutations";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import { createAuthenticationCode, createUserIDAndCode } from "@/utils/cryptography";

export default async function FoodPage() {

  //get the code
  let userVerificationCode = null;

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
        const userID = user.userId;

        const mac = await createAuthenticationCode(userID);
        userVerificationCode = createUserIDAndCode(userID, mac);
      }
    } catch (err) {
      console.log(err);
    }
  }

  await currentAuthenticatedUser();

  return (
    <div>
      <a> {userVerificationCode}</a>
    </div>
  );
}
