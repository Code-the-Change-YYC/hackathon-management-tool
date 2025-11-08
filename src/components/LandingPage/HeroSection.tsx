import Image from "next/image";
import client from "@/components/_Amplify/AmplifyBackendClient";
import { SuspenseWrapper } from "@/components/SuspenseWrapper";
import HackathonClock from "../HackathonClock";
import HeroSectionTile from "./HeroSectionTile";
import WindowContainer from "./WindowContainer";

const HERO_SECTION_BACKGROUND =
  "/images/landingpage/HeroSection/htc2024graphiclight2.png";

export default async function HeroSection() {
  const { data: hackathonData } = await client.models.Hackathon.list({
    selectionSet: ["id", "startDate", "endDate"],
    authMode: "apiKey",
  });

  // super scuffed please seed every sandbox with a hackathon first prolly
  if (hackathonData && hackathonData.length === 0) {
    return <div>Hackathon hasn't been created yet</div>;
  }

  const eventStartDate = new Date(2025, 10, 8, 17, 30, 0); // Month is 0-indexed → 10 = November
  const eventEndDate = new Date(2025, 10, 9, 25, 0, 0); // Example: Sunday 5 PM

  return (
    <div className="relative flex flex-col items-center justify-center md:px-8 md:py-16 lg:px-32">
      <Image
        src={HERO_SECTION_BACKGROUND}
        alt="Landing page background"
        fill={true}
        style={{ objectFit: "cover" }}
        className="pointer-events-none"
        quality={100}
        priority
      />
      <HeroSectionTile eventStartDate={eventStartDate} />
      <SuspenseWrapper>
        <WindowContainer>
          <HackathonClock
            eventStartDate={eventStartDate}
            eventEndDate={eventEndDate}
          />
        </WindowContainer>
      </SuspenseWrapper>
    </div>
  );
}
