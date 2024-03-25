"use client";

import { useEffect, useState } from "react";

const COUNTDOWN_CONTAINER = "mx-auto p-4";
const TIMER_CONTAINER = "flex justify-center my-12";
const TIMER_BACKGROUND =
  " bg-[#A689FF] text-white py-10 px-4 rounded-lg md:w-[8rem] md:h-[11rem] lg:w-[10rem] lg:h-[11rem] relative ";

const NUMBER_STYLES =
  "flex flex-col justify-center items-center font-bold text-[20px] md:text-[58px] lg:text-[60px]";
const LABEL_STYLES =
  " flex flex-col justify-center items-center uppercase text-1xl";
const HORIZONTAL_LINE =
  "absolute left-0 right-0 top-[50%] -translate-y-1/2 transform border-b-2 border-white opacity-95";
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

interface CountdownProps {
  eventName: string;
  eventYear: string;
  eventDate: number;
}

const CountdownDetails: CountdownProps = {
  eventName: "Hack the Change",
  eventYear: "2024",
  eventDate: 1731394799, //UNIX Time stamp: Nov 10, 2024
};

const CountdownTile = (props: CountdownProps) => {
  const { eventName, eventYear, eventDate } = props;

  const [hackathonTime, setHackathonTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString();
  };

  const eventDateFormatted = formatDate(eventDate);

  useEffect(() => {
    const target = new Date(eventDateFormatted);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setHackathonTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={COUNTDOWN_CONTAINER}>
      <div className="m-2 h-[24rem] rounded-3xl bg-[#BAFBE4] px-10 opacity-90 md:m-5">
        {hackathonTime ? (
          <h1
            className="flex-wrap pt-14 text-4xl font-black text-[#7055FD] drop-shadow-lg md:pt-20 md:text-center md:text-5xl lg:pt-32"
            style={HACKTIME_HEADER_STYLE}
          >
            {eventName} {eventYear}
            <br />
            has begun!
          </h1>
        ) : (
          <div>
            <h1 className="pt-10 text-center text-2xl font-bold text-[#7055FD]">
              {eventName} begins in ...{" "}
            </h1>
            <div className={TIMER_CONTAINER}>
              <div className="flex space-x-3">
                <div className={TIMER_BACKGROUND}>
                  <div className={NUMBER_STYLES}>{days}</div>
                  <div className={LABEL_STYLES}>Days</div>
                  <div className={HORIZONTAL_LINE}></div>
                </div>
                <div className={TIMER_BACKGROUND}>
                  <div className={NUMBER_STYLES}>{hours}</div>
                  <div className={LABEL_STYLES}>Hours</div>
                  <div className={HORIZONTAL_LINE}></div>
                </div>
                <div className={TIMER_BACKGROUND}>
                  <div className={NUMBER_STYLES}>{minutes}</div>
                  <div className={LABEL_STYLES}>Minutes</div>
                  <div className={HORIZONTAL_LINE}></div>
                </div>
                <div className={TIMER_BACKGROUND}>
                  <div className={NUMBER_STYLES}>{seconds}</div>
                  <div className={LABEL_STYLES}>Seconds</div>
                  <div className={HORIZONTAL_LINE}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CountdownTimer = () => {
  return (
    <div>
      <CountdownTile {...CountdownDetails} />
    </div>
  );
};

export default CountdownTimer;
