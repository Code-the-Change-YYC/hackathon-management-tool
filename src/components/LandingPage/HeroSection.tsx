import Image from "next/image";
import { fetchContent, getHackathonData } from "@/app/actions";
import HackathonClock from "../HackathonClock";
import HeroSectionTile from "./HeroSectionTile";
import WindowContainer from "./WindowContainer";

const HERO_SECTION_BACKGROUND =
  "/images/landingpage/HeroSection/htc2024graphiclight2.png";

export default async function HeroSection() {
  const hackathonData = await getHackathonData();
  const res = (await fetchContent("hackathonDetails"))[0];
  const hackathonDetails = res.fields;

  let eventStartDate = new Date(hackathonDetails.eventDate);
  let eventEndDate: Date | undefined;

  if (hackathonData?.startDate) {
    eventStartDate = new Date(hackathonData.startDate);
  }

  if (hackathonData?.endDate) {
    eventEndDate = new Date(hackathonData.endDate);
  }

  return (
    <div className="relative flex h-[100dvh] flex-col items-center justify-center md:px-8 md:py-16 lg:px-32">
      <Image
        src={HERO_SECTION_BACKGROUND}
        alt="Landing page background"
        fill={true}
        style={{ objectFit: "cover" }}
        className="pointer-events-none"
        quality={100}
        priority
      />
      <HeroSectionTile hackathonDetails={hackathonDetails} />
      <WindowContainer>
        <HackathonClock
          eventName={hackathonDetails.eventName}
          eventStartDate={eventStartDate}
          eventEndDate={eventEndDate}
        />
      </WindowContainer>
    </div>
  );
}
