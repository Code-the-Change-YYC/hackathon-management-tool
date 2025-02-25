import Image from "next/image";

import { fetchContent } from "@/app/actions";

import HackathonClock from "../HackathonClock";
import HeroSectionTile from "./HeroSectionTile";
import WindowContainer from "./WindowContainer";

const HERO_SECTION_BACKGROUND =
  "/images/landingpage/HeroSection/htc2024graphiclight2.png";

export default async function HeroSection() {
  const res = (await fetchContent("hackathonDetails"))[0];
  const hackathonDetails = res.fields;
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
          eventName={hackathonDetails.eventName}
          eventDate={new Date(hackathonDetails.eventDate)}
        />
      </WindowContainer>
    </div>
  );
}
