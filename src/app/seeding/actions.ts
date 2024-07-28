"use server";

// actions.ts
import { seedFoodEvents } from "./models/FoodEvent";
import { seedHackathon } from "./models/Hackathon";
import { seedTeams } from "./models/Team";
import { seedJudges } from "./models/User";

// Define a type for the seeding functions
type SeedingFunction = () => Promise<{ success: boolean; message: string }>;

// Add more functions here for data seeding
const DATA_SEEDING: { [key: string]: SeedingFunction } = {
  seedHackathon,
  seedFoodEvents,
  seedTeams,
  seedJudges,
};

export const getSeedingData = () => {
  return Object.keys(DATA_SEEDING);
};

export const seedData = async (selectedSeeds: string[]) => {
  let resultsLog = [];

  for (const seedName of selectedSeeds) {
    const func = DATA_SEEDING[seedName];
    if (func) {
      try {
        const result = await func();
        resultsLog.push({
          name: seedName.replace("seed", ""),
          success: result.success,
          message: result.message,
        });
      } catch (error) {
        resultsLog.push({
          name: seedName.replace("seed", ""),
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }
  }

  return resultsLog;
};
