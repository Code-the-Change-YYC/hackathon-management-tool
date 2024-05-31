"use client";

// app/food/page.tsx
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/utils/crytography";

import { getFoodEventDetails } from "./actions";

export default function FoodPage() {
  const client = generateClient<Schema>();

  const [userCode, setUserCode] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTimeRange, setEventTimeRange] = useState("");
  const [queueInfo, setQueueInfo] = useState("");
  const [userTimeSlot, setUserTimeSlot] = useState("");
  useEffect(() => {
    async function fetchData() {
      const userID = await fetchCurrentAuthenticatedUser();

      if (userID) {
        const {
          queuePosition,
          eventName,
          eventDescription,
          eventTime,
          timeslot,
        } = await getFoodEventDetails(userID);

        setEventName(eventName);
        setEventDescription(eventDescription);
        setQueueInfo(queuePosition);
        setEventTimeRange(eventTime);
        setUserTimeSlot(timeslot);
      }
    }
    fetchData();
  }, []);

  // Needs to be on client side since we need the authenticated client and their ID
  async function fetchCurrentAuthenticatedUser() {
    try {
      const { userId } = await getCurrentUser();

      if (userId) {
        await setUserVerificationCode(userId);
      }
      return userId;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get the user verification code and set it to the frontend
  async function setUserVerificationCode(userId: string) {
    const { data, errors } = await client.queries.GetUserMessageCode({
      userMessage: userId,
    });
    if (errors) {
      console.log(errors);
      setUserCode("Error when searching for your message code");
      return;
    }

    if (data) {
      const json = JSON.parse(data.body as string);
      const code = json["value"];

      const verificationCode = createMessageAndCode(userId, code);
      setUserCode(verificationCode);
    } else {
      setUserCode("Backend Server Error");
    }
  }

  return (
    <div className="mx-auto text-center">
      <h1>{eventName}</h1>
      <p>{eventDescription}</p>
      <p>{eventTimeRange}</p>
      <p>your time slot for food is: {userTimeSlot}</p>
      <p>{queueInfo}</p>

      <br></br>
      <a> {userCode}</a>
    </div>
  );
}
