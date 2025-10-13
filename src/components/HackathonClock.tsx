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

enum HackathonStatus {
  BEFORE = "before",
  ONGOING = "ongoing",
  ENDED = "ended",
}

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

const HEADER_TEXT = {
  [HackathonStatus.BEFORE]: "begins in ...",
  [HackathonStatus.ONGOING]: "is ongoing!",
  [HackathonStatus.ENDED]: "has ended!",
};

const SUBHEADER_TEXT = {
  [HackathonStatus.ONGOING]: "Time remaining ...",
};

export default function HackathonClock(props: {
  eventStartDate: Date;
  eventEndDate: Date;
}) {
  const { eventStartDate, eventEndDate } = props;
  const [currentTime, setCurrentTime] = useState(new Date());

  const hackathonStatus = useMemo(() => {
    if (currentTime < eventStartDate) {
      return HackathonStatus.BEFORE;
    }
    if (eventEndDate && currentTime >= eventEndDate) {
      return HackathonStatus.ENDED;
    }
    if (currentTime >= eventStartDate) {
      return HackathonStatus.ONGOING;
    }
    return HackathonStatus.BEFORE;
  }, [currentTime, eventStartDate, eventEndDate]);

  useEffect(() => {
    if (hackathonStatus === HackathonStatus.ENDED) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [hackathonStatus]);

  const timeRemaining = useMemo(() => {
    if (hackathonStatus === HackathonStatus.BEFORE) {
      return calculateDateDifference(eventStartDate, currentTime);
    }
    if (hackathonStatus === HackathonStatus.ONGOING && eventEndDate) {
      return calculateDateDifference(eventEndDate, currentTime);
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [currentTime, eventStartDate, eventEndDate, hackathonStatus]);

  const eventYear = eventStartDate.getFullYear();
  const showTimer = hackathonStatus !== HackathonStatus.ENDED;
  const headerClassName =
    hackathonStatus === HackathonStatus.BEFORE
      ? "pt-4 text-center text-2xl font-bold text-awesomer-purple"
      : "flex-wrap pt-14 text-4xl font-black text-awesomer-purple drop-shadow-lg md:pt-20 md:text-center md:text-5xl lg:pt-32";
  const headerStyle =
    hackathonStatus !== HackathonStatus.BEFORE
      ? HACKTIME_HEADER_STYLE
      : undefined;

  return (
    <>
      <h1 className={headerClassName} style={headerStyle}>
        {hackathonStatus === HackathonStatus.BEFORE
          ? `${EVENT_NAME} ${HEADER_TEXT[hackathonStatus]}`
          : `${EVENT_NAME} ${eventYear}`}
        {hackathonStatus !== HackathonStatus.BEFORE && (
          <>
            <br />
            {HEADER_TEXT[hackathonStatus]}
          </>
        )}
      </h1>
      {hackathonStatus === HackathonStatus.ONGOING && (
        <h2 className="pt-4 text-center text-xl font-bold text-awesomer-purple">
          {SUBHEADER_TEXT[hackathonStatus]}
        </h2>
      )}
      {showTimer && (
        <div className="flex max-w-screen-md flex-row items-center justify-center gap-2 py-4">
          <CountdownTimer name="Days" value={timeRemaining.days} />
          <CountdownTimer name="Hours" value={timeRemaining.hours} />
          <CountdownTimer name="Minutes" value={timeRemaining.minutes} />
          <CountdownTimer name="Seconds" value={timeRemaining.seconds} />
        </div>
      )}
    </>
  );
}
