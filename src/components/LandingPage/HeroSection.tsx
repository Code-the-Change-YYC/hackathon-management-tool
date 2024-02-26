import Image from "next/image";

import HeroSectionBackground from "/public/images/landingpage/hero_section_background.png";

const heroSectionStyles = "flex flex-col -mt-5";

export const HERO_SECTION = [
  {
    eventName: "Hack the Change 2024",
    eventBlurb:
      "Hack the Change 2024 is a hybrid two-day for-charity hackathon with the mission of coding a better world together.",
    eventDate: "UNIX timestamp probability",
  },
];

const HeroSection = () => {
  return (
    <div className={heroSectionStyles}>
      <div className="relative flex h-screen items-center justify-center">
        <div className="absolute size-full opacity-50">
          <Image
            src={HeroSectionBackground}
            alt="Landing page background"
            layout="fill"
            placeholder="blur"
            objectFit="cover"
          />
        </div>
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default HeroSection;
