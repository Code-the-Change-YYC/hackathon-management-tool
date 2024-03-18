// app/food/page.tsx
import { getCurrentUser } from "aws-amplify/auth";

export default async function FoodPage() {
  async function currentAuthenticatedUser() {
    try {
      const { username, userId } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
    } catch (err) {
      console.log(err);
    }
  }

  await currentAuthenticatedUser();

  return <a>test</a>;
}
