"use client";

// THIS PAGE IS A SAMPLE, PLEASE REPLACE IT AND IMPROVE IT FROM HERE
// app/food/page.tsx
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";

import { getUpcomingFoodEventDetails } from "./actions";

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
      // Needs to be on client side since we need the authenticated client and their ID
      const { userId } = await getCurrentUser();
      await setUserVerificationCode(userId);

      if (userId) {
        const {
          queuePosition,
          eventName,
          eventDescription,
          eventTime,
          timeslot,
        } = await getUpcomingFoodEventDetails(userId);

        setEventName(eventName);
        setEventDescription(eventDescription);
        setQueueInfo(queuePosition);
        setEventTimeRange(eventTime);
        setUserTimeSlot(timeslot);
      } else {
        setQueueInfo("User does not have a team");
      }
    }
    fetchData();
  }, []);

  // get the user verification code and set it to the frontend
  async function setUserVerificationCode(teamID: string) {
    const { data, errors } = await client.queries.GetUserMessageCode({
      userMessage: teamID,
    });
    if (errors) {
      console.log(errors);
      setUserCode("Error when searching for your message code");
      return;
    }

    if (data) {
      const json = JSON.parse(data.body as string);
      const code = json["value"];

      const verificationCode = createMessageAndCode(teamID, code);
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
