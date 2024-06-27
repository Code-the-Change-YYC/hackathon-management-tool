"use server";

// actions.ts
import { seedFoodEvents } from "./models/FoodEvent";
import { seedHackathon } from "./models/Hackathon";

// Add functions here for more seeding
const DATA_SEEDING = {
  seedHackathon,
  seedFoodEvents,
};

export const getSeedingData = () => {
  return Object.keys(DATA_SEEDING);
};

export const seedData = async (selectedSeeds: string[]) => {
  let resultsLog = [];

  // Filter the DATA_SEEDING object to only include the selected seeds
  const selectedFunctions = selectedSeeds.map((name) => DATA_SEEDING[name]);

  for (const func of selectedFunctions) {
    if (func) {
      try {
        const result = await func(); // Call the function directly
        resultsLog.push({
          name: func.name.replace("seed", ""), // Use the function's name property
          success: result.success,
          message: result.message,
        });
      } catch (error) {
        resultsLog.push({
          name: func.name.replace("seed", ""), // Use the function's name property
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }
  }

  return resultsLog; // Return the resultsLog
};
