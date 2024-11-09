"use server";

import { DateTime } from "luxon";

import { type Schema } from "@/amplify/data/resource";
import {
  getFoodGroupPositionNumber,
  getTimeForFoodGroupPositionNumber,
} from "@/amplify/function/BusinessLogic/utils/food-groups";
import client from "@/components/_Amplify/AmplifyBackendClient";

type FoodEvent = Schema["FoodEvent"]["type"];

/**
 * Get details about the current/upcoming food event:
 * When is the person going to eat, what is description
 * @param teamID
 * @returns
 */
export async function getUpcomingFoodEventDetails(userID: string): Promise<{
  queuePosition: string;
  eventName: string;
  eventDescription: string;
  eventTime: string;
  timeslot: string;
}> {
  const foodEvents = (await client.models.FoodEvent.list()).data;
  const currentTime = DateTime.now().setZone(process.env.TIME_ZONE).toJSDate(); // Current local time in the time zone
  const nextFoodEvent = getNextEvent(foodEvents, currentTime);
  if (nextFoodEvent) {
    const { data: user, errors: userErrors } = await client.models.User.get({
      id: userID,
    });
    if (userErrors || !user) {
      throw new Error("cannot find user data");
    }
    const teamID = user.teamId;
    if (teamID) {
      const userGroupPositionNumber = getFoodGroupPositionNumber(
        teamID,
        nextFoodEvent.id,
        nextFoodEvent.totalGroupCount,
      );

      const userTimeSlot = getTimeForFoodGroupPositionNumber(
        userGroupPositionNumber,
        nextFoodEvent.totalGroupCount,
        nextFoodEvent.start,
        nextFoodEvent.end,
      );
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const eventDuration =
        new Date(nextFoodEvent.start).toLocaleString("en-US", options) +
        " to " +
        new Date(nextFoodEvent.end).toLocaleDateString("en-US", options);

      return {
        queuePosition:
          userGroupPositionNumber +
          1 +
          " out of " +
          nextFoodEvent.totalGroupCount +
          " groups",
        eventName: nextFoodEvent.name,
        eventDescription: nextFoodEvent.description,
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
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  // Find the event that has already started, between start and end times
  let foundFoodEvent = sortedEvents.find(
    (event) =>
      currentTime >= new Date(event.start) &&
      currentTime <= new Date(event.end),
  );

  // find the next event if there is no event as of now
  if (foundFoodEvent === undefined) {
    foundFoodEvent = sortedEvents.find(
      (event) => new Date(event.start) > currentTime,
    );
  }
  return foundFoodEvent;
}
