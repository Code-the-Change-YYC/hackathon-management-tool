"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import HeroSectionBackground from "/public/images/landingpage/HeroSection/hero_section_background.png";

const HERO_SECTION_CONTAINER =
  "relative flex -mt-5 justify-between py-4 md:py-15 md:px-24 lg:px-40 drop-shadow-lg md:drop-shadow-none";

const HERO_TILE_STYLES = "mx-10 mb-20 md:mb-0 lg:mt-10 ";
const LINK_STYLES =
  " cursor-pointer opacity-95 md:my-4 flex justify-start font-bold md:justify-center";

const WEBPAGE_CONTAINER =
  "hidden md:block lg:block h-[25rem] rounded-t-md bg-[#00D3A9] opacity-95";
const COUNTDOWN_CONTAINER = "flex justify-center my-8";
const COUNTDOWN_BACKGROUND =
  " bg-[#A689FF] text-white py-10 px-4 rounded-lg md:w-[8rem] md:h-[11rem] lg:w-[10rem] lg:h-[11rem] relative ";
const NUMBER_STYLES =
  "flex flex-col justify-center items-center font-bold text-[20px] md:text-[50px] lg:text-[60px]";
const LABEL_STYLES =
  " flex flex-col justify-center items-center uppercase text-1xl";
const HORIZONTAL_LINE =
  "absolute left-0 right-0 top-[50%] -translate-y-1/2 transform border-b-2 border-white opacity-95";

type HeroSectionProps = {
  eventName: string;
  eventYear: string;
  eventBlurb: string;
  eventDate: number;
};

const HeroSectionDetails: HeroSectionProps = {
  eventName: "Hack the Change",
  eventYear: "2024",
  eventBlurb:
    "Hack the Change 2024 is a hybrid two-day for-charity hackathon with the mission of coding a better world together.",
  eventDate: 1731394799, //UNIX Time stamp: Nov 10, 2024
};

const HeroSectionTile = (props: HeroSectionProps) => {
  //Destructure props object to access specific properties
  const { eventName, eventYear, eventBlurb, eventDate } = props;

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
    <div className={HERO_TILE_STYLES}>
      <div>
        <h1 className="mt-20 flex-wrap text-5xl font-black text-[#FFFF] outline-pink-400 drop-shadow-lg md:text-center md:text-6xl">
          {" "}
          {eventName}
          <span className="text-[#BAFBE4]"> {eventYear}</span>
        </h1>
        <strong className="text-1xl my-4 flex flex-wrap justify-center text-[#7055FD]   md:text-center md:text-xl lg:px-40">
          {eventBlurb}
        </strong>
      </div>
      <div className={LINK_STYLES}>
        <Link href="/" legacyBehavior>
          <div className=" mb-4 rounded-2xl border-4 border-white bg-[#7055FD] px-6 py-2 text-sm text-white  hover:opacity-70 md:mb-0 md:px-6">
            Join Hackathon
          </div>
        </Link>
      </div>
      <div className={LINK_STYLES}>
        <p>
          Already registered?
          <Link href="/" legacyBehavior>
            <span className="text-sm text-[#7055FD]  hover:opacity-70">
              {" "}
              Sign in
            </span>
          </Link>
        </p>
      </div>

      <div className={WEBPAGE_CONTAINER}>
        <div className="rounded-t-md border-t-[30px] border-white">
          <div className="container mx-auto p-4">
            <div className="m-2 h-[24rem] rounded-t-3xl bg-[#BAFBE4] px-10 opacity-90 md:m-5">
              <h1 className="pt-10 text-center text-2xl font-bold text-[#7055FD]">
                {eventName} begins...{" "}
              </h1>
              {hackathonTime ? (
                <h1>
                  {eventName} {eventYear} has begun!
                </h1>
              ) : (
                <div className={COUNTDOWN_CONTAINER}>
                  <div className="flex space-x-3">
                    <div className={COUNTDOWN_BACKGROUND}>
                      <div className={NUMBER_STYLES}>{days}</div>
                      <div className={LABEL_STYLES}>Days</div>
                      <div className={HORIZONTAL_LINE}></div>
                    </div>
                    <div className={COUNTDOWN_BACKGROUND}>
                      <div className={NUMBER_STYLES}>{hours}</div>
                      <div className={LABEL_STYLES}>Hours</div>
                      <div className={HORIZONTAL_LINE}></div>
                    </div>
                    <div className={COUNTDOWN_BACKGROUND}>
                      <div className={NUMBER_STYLES}>{minutes}</div>
                      <div className={LABEL_STYLES}>Minutes</div>
                      <div className={HORIZONTAL_LINE}></div>
                    </div>
                    <div className={COUNTDOWN_BACKGROUND}>
                      <div className={NUMBER_STYLES}>{seconds}</div>
                      <div className={LABEL_STYLES}>Seconds</div>
                      <div className={HORIZONTAL_LINE}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className={HERO_SECTION_CONTAINER}>
      <Image
        src={HeroSectionBackground}
        alt="Landing page background"
        layout="fill"
        placeholder="blur"
        objectFit="cover"
        loading="lazy"
      />
      <HeroSectionTile {...HeroSectionDetails} />
    </div>
  );
};

export default HeroSection;
