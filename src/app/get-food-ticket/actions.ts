"use server";

import { type Schema } from "@/amplify/data/resource";
import {
  getCalgaryTime,
  getCurrentCalgaryTime,
} from "@/amplify/function/utils/date";
import {
  getGroupNumber,
  getUserTimeSlot,
} from "@/amplify/function/utils/food-groups";
import client from "@/components/_Amplify/AmplifyBackendClient";

type FoodEvent = Schema["FoodEvent"]["type"];

/**
 * Get details about the current/upcoming food event:
 * When is the person going to eat, what is description
 * @param userID
 * @returns
 */
export async function getFoodEventDetails(userID: string): Promise<{
  queuePosition: string;
  eventName: string;
  eventDescription: string;
  eventTime: string;
  timeslot: string;
}> {
  const foodEvents = (await client.models.FoodEvent.list()).data;

  const currentTime = getCurrentCalgaryTime(); // Current local time
  const nextFoodEvent = getNextEvent(foodEvents, currentTime);

  if (nextFoodEvent) {
    if (userID) {
      const userTimeSlot = getUserTimeSlot(
        userID,
        nextFoodEvent.id,
        nextFoodEvent?.groups,
        nextFoodEvent.start || "",
        nextFoodEvent.end || "",
      );
      const userGroup = getGroupNumber(
        userID,
        nextFoodEvent.id,
        nextFoodEvent?.groups,
      );

      const eventDuration =
        getCalgaryTime(nextFoodEvent.start) +
        " to " +
        getCalgaryTime(nextFoodEvent.end);

      return {
        queuePosition:
          "You are in position number " +
          (userGroup + 1) +
          " out of " +
          nextFoodEvent?.groups +
          " groups",
        eventName: nextFoodEvent.name || "",
        eventDescription: nextFoodEvent.description || "",
        eventTime: eventDuration,
        timeslot: userTimeSlot,
      };
    }
  }
  return {
    queuePosition: "",
    eventName: "No Upcoming Food Event",
    eventDescription: "No Event....",
    eventTime: "",
    timeslot: "",
  };
}

/**
 * Get the food event that is happening, or the next one that will happen
 */
function getNextEvent(foodEvents: FoodEvent[], currentTime: Date) {
  // Sort the events by their start time
  const sortedEvents = foodEvents.sort(
    (a, b) =>
      getCalgaryTime(a.start || "").getTime() -
      getCalgaryTime(b.start || "").getTime(),
  );

  // Find the event that has already started, between start and end times
  let foundFoodEvent = sortedEvents.find(
    (event) =>
      currentTime >= getCalgaryTime(event.start || "") &&
      currentTime <= getCalgaryTime(event.end || ""),
  );

  // find the next event if there is no event as of now
  if (foundFoodEvent === undefined) {
    foundFoodEvent = sortedEvents.find(
      (event) => getCalgaryTime(event.start || "") > currentTime,
    );
  }
  return foundFoodEvent;
}
