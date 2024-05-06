"use client";

// app/food/page.tsx
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { createUserIDAndCode } from "@/amplify/function/utils/crytography";
import { getUserTimeSlot } from "@/amplify/function/utils/food-groups";
import * as mutations from "@/graphql/mutations";
import { getLocalCalgaryTime } from "@/utils/date";

export default function FoodPage() {
  const client = generateClient<Schema>();

  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const userID: string = "";

  useEffect(() => {
    async function fetchCurrentAuthenticatedUser() {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();

        if (userId) {
          const response = await client.graphql({
            query: mutations.getUserVerifcationCode,
            variables: {
              userId: userId,
            },
          });
          const mac = response.body["value"];
          setUserVerificationCode(createUserIDAndCode(userID, mac));
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchUserNextFoodEvent() {
      const foodEvents = await client.models.FoodEvent.list();
      const currentTime = getLocalCalgaryTime(); // Current local time

      // Sort the events by their start time
      const nextEvent = getNextEvent(foodEvents, currentTime);

      if (nextEvent) {
        setEventName(nextEvent.Name);
        setEventDescription(nextEvent.Description);

        if (userID) {
          const userTimeSlot = getUserTimeSlot(
            userID,
            nextEvent.id,
            nextEvent?.Groups,
            nextEvent.Start,
            nextEvent.End,
          );
          setTimeSlot(userTimeSlot);
        }
      } else {
        console.log("No upcoming food events.");
      }
    }

    fetchCurrentAuthenticatedUser();
    fetchUserNextFoodEvent();
  }, []);

  return (
    <div className="mx-auto text-center">
      {eventName && (
        <>
          <h1>{eventName}</h1>
          <p>{eventDescription}</p>
          <p>your time slot for food is: {timeSlot}</p>

          <br></br>
          <a> {userVerificationCode}</a>
        </>
      )}
    </div>
  );
}

function getNextEvent(foodEvents, currentTime: Date) {
  const sortedEvents = foodEvents.data.sort(
    (a, b) => new Date(a.Start) - new Date(b.Start),
  );

  // Find the event that has already started, between start and end times
  let nextEvent = sortedEvents.find(
    (event) =>
      currentTime >= new Date(event.Start) &&
      currentTime <= new Date(event.End),
  );

  // find the next event if there is event as of now
  if (nextEvent == undefined) {
    nextEvent = sortedEvents.find(
      (event) => new Date(event.Start) > currentTime,
    );
  }
  return nextEvent;
}
