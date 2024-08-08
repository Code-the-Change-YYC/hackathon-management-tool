"use client";

import { useEffect, useState } from "react";

import CountdownTimer from "../LandingPage/CountdownTimer";
import { calculateDateDifference } from "../LandingPage/HeroSection";
import Card from "./Card";

export default function SubmissionDueClock() {
  const eventDate = 1731394799; //UNIX Time stamp: Nov 10, 2024
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  useEffect(() => {
    const intervalID = setInterval(() => {
      const { d, h, m } = calculateDateDifference(new Date(eventDate * 1000));
      setHour(h + 24 * d);
      setMinute(m);
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);
  return (
    <Card className="flex-1 gap-4">
      <div className="font-extrabold italic">Submission Due In...</div>
      <div className="flex flex-row gap-4">
        <CountdownTimer
          name={"Hours"}
          value={hour}
          className="bg-emerald-500"
        />
        <CountdownTimer
          name={"Minutes"}
          value={minute}
          className="bg-emerald-500"
        />
      </div>
    </Card>
  );
}
