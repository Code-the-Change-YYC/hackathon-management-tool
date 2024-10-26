import Image from "next/image";

import { fetchContent } from "@/app/actions";
import type { HackathonDetails } from "@/app/contentfulTypes";

import HackathonClock from "../HackathonClock";
import HeroSectionTile from "./HeroSectionTile";
import WindowContainer from "./WindowContainer";

const HERO_SECTION_BACKGROUND =
  "/images/landingpage/HeroSection/hero_section_background.png";

export default async function HeroSection() {
  const hackathonDetails = (
    (await fetchContent("hackathonDetails")) as unknown as HackathonDetails[]
  )[0];
  return (
    <div className="md:py-15 relative flex flex-col items-center justify-center md:px-8 lg:px-32 ">
      <Image
        src={HERO_SECTION_BACKGROUND}
        alt="Landing page background"
        fill={true}
        style={{ objectFit: "cover" }}
        className="pointer-events-none"
      />
      <HeroSectionTile hackathonDetails={hackathonDetails} />
      <WindowContainer>
        <HackathonClock
          eventName={hackathonDetails.fields.eventName}
          eventDate={new Date(hackathonDetails.fields.eventDate)}
        />
      </WindowContainer>
    </div>
  );
}
