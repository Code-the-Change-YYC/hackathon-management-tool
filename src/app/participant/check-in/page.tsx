"use client";

// THIS PAGE IS A SAMPLE, PLEASE REPLACE IT AND IMPROVE IT FROM HERE
// app/food/page.tsx
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";

import { type Schema } from "@/amplify/data/resource";

export default function FoodPage() {
  const client = generateClient<Schema>();

  const handleCheckIn = async () => {
    const { userId } = await getCurrentUser();
    const { data: user } = await client.models.User.get({
      id: userId,
    });
    console.log(user);

    try {
      const result = await client.mutations.SetUserAsAttended({
        userId: userId,
      });

      console.log("User checked in:", result);
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  return (
    <div className="mx-auto text-center">
      <button onSubmit={handleCheckIn}>press me</button>
    </div>
  );
}
