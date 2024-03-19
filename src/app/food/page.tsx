// app/food/page.tsx
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";

export default function FoodPage() {
  async function currentAuthenticatedUser() {
    try {
      const user = await AuthGetCurrentUserServer()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(`The username: ${user?.username}`);
      console.log(`The userId: ${user?.userId}`);
    } catch (err) {
      console.log(err);
    }
  }

  void currentAuthenticatedUser();

  return <a>test</a>;
}
