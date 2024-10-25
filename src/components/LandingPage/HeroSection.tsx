"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchContent } from "@/app/actions";
import type { HackathonDetails } from "@/app/contentfulTypes";
import CountdownTimer from "@/components/LandingPage/CountdownTimer";
import { useAuthenticator } from "@aws-amplify/ui-react";

const HERO_SECTION_CONTAINER =
  "relative flex flex-col justify-between md:py-15 md:px-24 lg:px-40 ";
const HERO_SECTION_BACKGROUND =
  "/images/landingpage/HeroSection/hero_section_background.png";
const HERO_HEADER_STYLE = {
  textShadow: `
		-2px -2px 0 #7055FD, 
		2px -2px 0 #7055FD, 
		-2px 2px 0 #7055FD, 
		2px 2px 0 #7055FD,
		-2px -2px 0 #7055FD,
		2px -2px 0 #7055FD,
		-2px 2px 0 #7055FD,
		2px 2px 0 #7055FD
	`,
};
const HERO_TILE_STYLES = "mx-10 mb-20 md:mb-0 lg:mt-10";
const LINK_STYLES =
  " cursor-pointer opacity-95 md:my-4 flex justify-start font-bold md:justify-center";

const WEBPAGE_CONTAINER =
  "hidden md:block lg:block rounded-t-md bg-[#00D3A9] opacity-95 ";

const COUNTDOWN_CONTAINER = "mx-auto p-4";
const TIMER_CONTAINER = "flex justify-center my-12";

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

export const calculateDateDifference = (
  targetDate: Date,
  referenceDate = new Date(),
): {
  d: number;
  h: number;
  m: number;
  s: number;
} => {
  const difference = targetDate.getTime() - referenceDate.getTime();

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((difference % (1000 * 60)) / 1000);
  return { d, h, m, s };
};

const HeroSectionTile = ({
  hackathonDetails,
}: {
  hackathonDetails: Partial<HackathonDetails>;
}) => {
  const eventDate =
    hackathonDetails?.fields?.eventDate || new Date().toISOString();
  const { eventName, eventBlurb } = hackathonDetails?.fields || {};
  const eventYear = eventDate ? new Date(eventDate).getFullYear() : 0;
  const [hackathonTime, setHackathonTime] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      if (!isNaN(new Date(eventDate).getTime())) {
        const { d, h, m, s } = calculateDateDifference(new Date(eventDate));
        setTimeRemaining({ days: d, hours: h, minutes: m, seconds: s });

        if (d + h + m + s <= 0) {
          setHackathonTime(true);
        }
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initialize with the current time difference

    return () => clearInterval(interval);
  }, [eventDate]);

  const { authStatus } = useAuthenticator();

  return (
    <div className={HERO_TILE_STYLES}>
      <div>
        <h1
          className="mt-16 flex-wrap text-5xl font-black text-[#FFFF] drop-shadow-lg md:text-center md:text-6xl"
          style={HERO_HEADER_STYLE}
        >
          {eventName ? eventName : "Loading..."}
          <span className="text-pastel-green">
            {" "}
            {eventYear ? eventYear : ""}
          </span>
        </h1>
        <strong className="text-1xl my-4 flex flex-wrap justify-center text-awesomer-purple opacity-95  md:text-center md:text-xl lg:px-40">
          {eventBlurb ? eventBlurb : ""}
        </strong>
      </div>

      <div className={LINK_STYLES}>
        <a
          href={
            authStatus === "authenticated"
              ? "/participant/profile"
              : "/register"
          }
        >
          <div className="mb-4 rounded-2xl border-4 border-white bg-awesomer-purple px-6 py-2 text-sm text-white  hover:opacity-70 md:mb-0 md:px-6">
            {authStatus === "authenticated"
              ? "Go to Profile"
              : "Join Hackathon"}
          </div>
        </a>
      </div>

      {authStatus !== "authenticated" && (
        <div className={LINK_STYLES}>
          <p className="my-2">
            Already registered?{" "}
            <a href="/login">
              <span className="text-awesomer-purple hover:opacity-70">
                Sign in
              </span>
            </a>
          </p>
        </div>
      )}

      <div className={WEBPAGE_CONTAINER}>
        <div className="relative rounded-t-md border-t-[30px] border-white">
          <Image
            src={"/svgs/heroSection/window_control_buttons.svg"}
            alt="check mark icon"
            width={50}
            height={50}
            className="absolute left-0 top-0 -mt-5 ms-3"
          />
          <div className={COUNTDOWN_CONTAINER}>
            <div className="m-2 h-96 rounded-3xl bg-pastel-green px-10 opacity-90 md:m-5">
              {hackathonTime ? (
                <h1
                  className="flex-wrap pt-14 text-4xl font-black text-awesomer-purple drop-shadow-lg md:pt-20 md:text-center md:text-5xl lg:pt-32"
                  style={HACKTIME_HEADER_STYLE}
                >
                  {eventName} {eventYear}
                  <br />
                  has begun!
                </h1>
              ) : (
                <div>
                  <h1 className="pt-10 text-center text-2xl font-bold text-awesomer-purple">
                    {eventName ? <>{eventName} begins in ... </> : "Loading..."}
                  </h1>
                  <div className={TIMER_CONTAINER}>
                    <div className="flex space-x-3">
                      <CountdownTimer name="Days" value={timeRemaining.days} />
                      <CountdownTimer
                        name="Hours"
                        value={timeRemaining.hours}
                      />
                      <CountdownTimer
                        name="Minutes"
                        value={timeRemaining.minutes}
                      />
                      <CountdownTimer
                        name="Seconds"
                        value={timeRemaining.seconds}
                      />
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

export default function HeroSection() {
  const [heroSectionDetails, setHeroSectionDetails] = useState<
    Partial<HackathonDetails>
  >({
    fields: {
      eventName: "",
      eventBlurb: "",
      eventDate: Date.now().toString(),
      locationName: "",
      locationImage: {
        sys: {
          id: "",
          type: "Asset",
          createdAt: "2024-08-27T05:39:52.573Z",
          updatedAt: "2024-08-27T05:39:52.573Z",
          environment: {
            sys: {
              id: "",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          space: {
            sys: {
              id: "",
              type: "Link",
              linkType: "Space",
            },
          },
        },
        metadata: {
          tags: [],
        },
        fields: {
          file: {
            url: "",
            details: {
              size: 0,
              image: { width: 0, height: 0 },
            },
            fileName: "",
            contentType: "",
          },
        },
      },
      prizeAmount: 0,
    },
  });
  const getHackathonDetails = async () => {
    const data = (await fetchContent(
      "hackathonDetails",
    )) as unknown as HackathonDetails[];
    setHeroSectionDetails(data[0]);
  };
  useEffect(() => {
    getHackathonDetails();
  }, []);
  return (
    <div className={HERO_SECTION_CONTAINER}>
      <Image
        src={HERO_SECTION_BACKGROUND}
        alt="Landing page background"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <HeroSectionTile hackathonDetails={heroSectionDetails} />
    </div>
  );
}
