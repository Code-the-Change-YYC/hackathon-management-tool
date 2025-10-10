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

const EVENT_NAME = "Hack the Change";

export default function HackathonClock(props: {
  eventStartDate: Date;
  eventEndDate?: Date;
}) {
  const { eventStartDate, eventEndDate } = props;
  const [currentTime, setCurrentTime] = useState(new Date());

  const hackathonStatus = useMemo(() => {
    if (currentTime < eventStartDate) {
      return "before";
    }
    if (eventEndDate && currentTime >= eventEndDate) {
      return "ended";
    }
    if (currentTime >= eventStartDate) {
      return "ongoing";
    }
    return "before";
  }, [currentTime, eventStartDate, eventEndDate]);

  useEffect(() => {
    if (hackathonStatus === "ended") return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [hackathonStatus]);

  const timeRemaining = useMemo(() => {
    if (hackathonStatus === "before") {
      return calculateDateDifference(eventStartDate, currentTime);
    }
    if (hackathonStatus === "ongoing" && eventEndDate) {
      return calculateDateDifference(eventEndDate, currentTime);
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [currentTime, eventStartDate, eventEndDate, hackathonStatus]);

  const eventYear = eventStartDate.getFullYear();

  if (hackathonStatus === "ended") {
    return (
      <h1
        className="flex-wrap pt-14 text-4xl font-black text-awesomer-purple drop-shadow-lg md:pt-20 md:text-center md:text-5xl lg:pt-32"
        style={HACKTIME_HEADER_STYLE}
      >
        {EVENT_NAME} {eventYear}
        <br />
        has ended!
      </h1>
    );
  }

  if (hackathonStatus === "ongoing") {
    return (
      <>
        <h1
          className="flex-wrap pt-14 text-4xl font-black text-awesomer-purple drop-shadow-lg md:pt-20 md:text-center md:text-5xl lg:pt-32"
          style={HACKTIME_HEADER_STYLE}
        >
          {EVENT_NAME} {eventYear}
          <br />
          is ongoing!
        </h1>
        {eventEndDate && (
          <>
            <h2 className="pt-4 text-center text-xl font-bold text-awesomer-purple">
              Time remaining ...
            </h2>
            <div className="flex max-w-screen-md flex-row items-center justify-center gap-2 py-4">
              <CountdownTimer name="Days" value={timeRemaining.days} />
              <CountdownTimer name="Hours" value={timeRemaining.hours} />
              <CountdownTimer name="Minutes" value={timeRemaining.minutes} />
              <CountdownTimer name="Seconds" value={timeRemaining.seconds} />
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-bold text-awesomer-purple">
        {EVENT_NAME} begins in ...
      </h1>
      <div className="flex max-w-screen-md flex-row items-center justify-center gap-2 py-4">
        <CountdownTimer name="Days" value={timeRemaining.days} />
        <CountdownTimer name="Hours" value={timeRemaining.hours} />
        <CountdownTimer name="Minutes" value={timeRemaining.minutes} />
        <CountdownTimer name="Seconds" value={timeRemaining.seconds} />
      </div>
    </>
  );
}
