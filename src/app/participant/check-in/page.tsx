"use client";

// THIS PAGE IS A SAMPLE, PLEASE REPLACE IT AND IMPROVE IT FROM HERE
// app/food/page.tsx
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";

import { type Schema } from "@/amplify/data/resource";
import { UserType } from "@/components/contexts/UserContext";
import withAuthGuard from "@/components/hoc/withAuthGuard";

function FoodPage() {
  const client = generateClient<Schema>();

  const handleCheckIn = async () => {
    const { userId } = await getCurrentUser();
    console.log(userId);
    const { data: user } = await client.models.User.get({
      id: userId,
    });
    console.log(user);

    try {
      const result = await client.mutations.SetUserAsCheckedIn({
        userId: userId,
      });

      console.log("User checked in:", result);
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  return (
    <div className="mx-auto text-center">
      <button onClick={handleCheckIn}>press me</button>
    </div>
  );
}

export default withAuthGuard(FoodPage, [UserType.Participant]);
