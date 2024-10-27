"use client";

import { useEffect, useMemo, useState } from "react";

import { hackathonTimeRemaining } from "@/utils/date-utils";

import CountdownTimer from "../LandingPage/CountdownTimer";
import Card from "./Card";

export default function SubmissionDueClock({
  submissionTime,
}: {
  submissionTime: Date;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const hackathonIsOver = useMemo(() => {
    return currentTime >= submissionTime;
  }, [currentTime, submissionTime]);
  useEffect(() => {
    if (hackathonIsOver) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime, submissionTime]);
  const { hours, minutes } = useMemo(() => {
    return hackathonTimeRemaining(submissionTime, currentTime);
  }, [currentTime, submissionTime]);

  if (hackathonIsOver) {
    return (
      <Card className="flex-1 gap-4">
        <div className="text-2xl font-bold">
          Deadline for submission has passed! <br />
          Thank you for participating!
        </div>
      </Card>
    );
  }
  return (
    <Card className="flex-1 gap-4">
      <div className="font-extrabold italic">Submission Due In...</div>
      <div className="flex flex-row gap-4">
        <CountdownTimer
          name={"Hours"}
          value={hours}
          className="w-52 bg-emerald-500 md:w-52  lg:w-52"
        />
        <CountdownTimer
          name={"Minutes"}
          value={minutes}
          className="w-52 bg-emerald-500 md:w-52 lg:w-52"
        />
      </div>
    </Card>
  );
}
