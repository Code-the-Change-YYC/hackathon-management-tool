"use client";

import Image from "next/image";
import Link from "next/link";

import CountdownTimer from "@/components/LandingPage/CountdownTimer";

const HERO_SECTION_BACKGROUND =
  "/images/landingPage/HeroSection/hero_section_background.png";
const HERO_SECTION_CONTAINER =
  "relative flex flex-col justify-between md:py-15 md:px-24 lg:px-40 ";
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
const WINDOW_BUTTONS_SVG = "/svgs/heroSection/window_control_buttons.svg";

interface HeroSectionProps {
  eventName: string;
  eventYear: string;
  eventBlurb: string;
}

const HeroSectionDetails: HeroSectionProps = {
  eventName: "Hack the Change",
  eventYear: "2024",
  eventBlurb:
    "Hack the Change 2024 is a hybrid two-day for-charity hackathon with the mission of coding a better world together.",
};

const HeroSectionTile = (props: HeroSectionProps) => {
  //Destructure props object to access specific properties
  const { eventName, eventYear, eventBlurb } = props;

  return (
    <div className={HERO_TILE_STYLES}>
      <div>
        <h1
          className="mt-16 flex-wrap text-5xl font-black text-[#FFFF] drop-shadow-lg md:text-center md:text-6xl"
          style={HERO_HEADER_STYLE}
        >
          {" "}
          {eventName}
          <span className="text-[#BAFBE4]"> {eventYear}</span>
        </h1>
        <strong className="text-1xl my-4 flex flex-wrap justify-center text-[#7055FD] opacity-95  md:text-center md:text-xl lg:px-40">
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
        <p className="my-2">
          Already registered?
          <Link href="/" legacyBehavior>
            <span className=" text-[#7055FD]  hover:opacity-70"> Sign in</span>
          </Link>
        </p>
      </div>

      <div className={WEBPAGE_CONTAINER}>
        <div className="relative rounded-t-md border-t-[30px] border-white">
          <Image
            src={WINDOW_BUTTONS_SVG}
            alt="check mark icon"
            width={50}
            height={50}
            className="absolute left-0 top-0 -mt-5 ms-3"
          ></Image>
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className={HERO_SECTION_CONTAINER}>
      <Image
        src={HERO_SECTION_BACKGROUND}
        alt="Landing page background"
        fill={true}
        objectFit="cover"
      />
      <HeroSectionTile {...HeroSectionDetails} />
    </div>
  );
};

export default HeroSection;
