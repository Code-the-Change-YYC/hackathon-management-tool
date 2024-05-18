"use client";

// app/food/page.tsx
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { createUserIDAndCode } from "@/amplify/function/utils/crytography";
import {
  getCalgaryTime,
  getLocalCalgaryTime,
} from "@/amplify/function/utils/date";
import { getUserTimeSlot } from "@/amplify/function/utils/food-groups";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function FoodPage() {
  const client = generateClient<Schema>();

  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  useEffect(() => {
    async function fetchCurrentAuthenticatedUser() {
      try {
        const { userId } = await getCurrentUser();

        if (userId) {
          const response = await client.mutations.getUserVerifcationCode({
            userId: userId,
          });
          const response_body = response.data?.body;

          if (response_body) {
            const json = JSON.parse(response_body as string);
            const code = json["value"];

            const verificationCode = createUserIDAndCode(userId, code);
            setUserVerificationCode(verificationCode);
          } else {
            setUserVerificationCode("Backend Server Error");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchUserNextFoodEvent() {
      const foodEvents = (await client.models.FoodEvent.list()).data;
      const currentTime = getLocalCalgaryTime(); // Current local time

      // Sort the events by their start time
      const nextFoodEvent = getNextEvent(foodEvents, currentTime);

      if (nextFoodEvent) {
        setEventName(nextFoodEvent.name ? nextFoodEvent.name : "");
        setEventDescription(
          nextFoodEvent.description ? nextFoodEvent.description : "",
        );

        const { userId } = await getCurrentUser();
        if (userId) {
          const userTimeSlot = getUserTimeSlot(
            userId,
            nextFoodEvent.id,
            nextFoodEvent?.groups,
            nextFoodEvent.start || "",
            nextFoodEvent.end || "",
          );

          setTimeSlot(userTimeSlot);
        }
      } else {
        setEventName("No upcoming food events.");
      }
    }

    fetchCurrentAuthenticatedUser();
    fetchUserNextFoodEvent();
  }, []);

  return (
    <div className="mx-auto text-center">
      <h1>{eventName}</h1>
      <p>{eventDescription}</p>
      <p>your time slot for food is: {timeSlot}</p>

      <br></br>
      <a> {userVerificationCode}</a>
    </div>
  );
}

function getNextEvent(foodEvents: FoodEvent[], currentTime: Date) {
  const sortedEvents = foodEvents.sort(
    (a, b) =>
      getCalgaryTime(a.start || "").getTime() -
      getCalgaryTime(b.start || "").getTime(),
  );

  // Find the event that has already started, between start and end times
  let nextEvent = sortedEvents.find(
    (event) =>
      currentTime >= getCalgaryTime(event.start || "") &&
      currentTime <= getCalgaryTime(event.end || ""),
  );

  // find the next event if there is no event as of now
  if (nextEvent === undefined) {
    nextEvent = sortedEvents.find(
      (event) => getCalgaryTime(event.start || "") > currentTime,
    );
  }
  return nextEvent;
}
