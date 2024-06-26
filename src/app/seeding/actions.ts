"use server";

// actions.ts
import { seedFoodEvents } from "./models/FoodEvent";
import { seedHackathon } from "./models/Hackathon";

const data_seeding = [seedHackathon, seedFoodEvents];

export const getSeedingData = () => {
  return ["Hackathon", "FoodEvents"];
};

export const seedData = async () => {
  let resultsLog = [];

  for (const func of data_seeding) {
    try {
      const result = await func(); // Make sure the seeding functions return Promises
      resultsLog.push({
        name: func.name,
        success: result.success,
        message: result.message,
      });
    } catch (error) {
      resultsLog.push({
        name: func.name,
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  return resultsLog; // Return the results log
};
