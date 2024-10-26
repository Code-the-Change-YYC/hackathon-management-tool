"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { calculateDateDifference } from "@/utils/date-utils";

const CountdownTimer = dynamic(() => import("./LandingPage/CountdownTimer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-24 rounded-lg bg-awesome-purple p-4  sm:p-8 md:w-36" />
  ),
});
const HACKTIME_HEADER_STYLE = {
  textShadow: `
		-2px -2px 0 #fff, 
		2px -2px 0 #fff, 
		-2px 2px 0 #fff, 
		2px 2px 0 #fff,
		-2px -2px 0 #fff,
		2px -2px 0 #fff,
		-2px 2px 0 #fff,
		2px 2px 0 #fff
	`,
};

export default function HackathonClock(props: {
  eventName: string;
  eventDate: Date;
}) {
  const { eventName, eventDate } = props;
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    if (isHackathonTime) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime, eventDate]);
  const isHackathonTime = useMemo(() => {
    return currentTime >= eventDate;
  }, [currentTime, eventDate]);

  const timeRemaining = useMemo(() => {
    return calculateDateDifference(eventDate, currentTime);
  }, [currentTime, eventDate]);
  const eventYear = eventDate.getFullYear();
  if (isHackathonTime) {
    return (
      <h1
        className="flex-wrap pt-14 text-4xl font-black text-awesomer-purple drop-shadow-lg md:pt-20 md:text-center md:text-5xl lg:pt-32"
        style={HACKTIME_HEADER_STYLE}
      >
        {eventName} {eventYear}
        <br />
        has begun!
      </h1>
    );
  }

  return (
    <>
      <h1 className="pt-10 text-center text-2xl font-bold text-awesomer-purple">
        {eventName} begins in ...
      </h1>
      <div
        className={
          "my-12 flex max-w-screen-md items-center justify-center space-x-3"
        }
      >
        <CountdownTimer name="Days" value={timeRemaining.days} />
        <CountdownTimer name="Hours" value={timeRemaining.hours} />
        <CountdownTimer name="Minutes" value={timeRemaining.minutes} />
        <CountdownTimer name="Seconds" value={timeRemaining.seconds} />
      </div>
    </>
  );
}
