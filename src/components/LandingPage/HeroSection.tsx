import Image from "next/image";
import PropTypes from "prop-types";

import HeroSectionBackground from "/public/images/landingpage/hero_section_background.png";

const heroSectionStyles = "flex flex-col -mt-5";
const heroTileStyles = "mx-10 -mt-20 md:m-0 ";

interface HeroTileProps {
  eventName: string;
  eventYear: string;
  eventBlurb: string;
  eventDate: string;
}

export const HERO_SECTION = [
  {
    eventName: "Hack the Change",
    eventYear: "2024",
    eventBlurb:
      "Hack the Change 2024 is a hybrid two-day for-charity hackathon with the mission of coding a better world together.",
    eventDate: "UNIX timestamp probability",
  },
];

const HeroTile: React.FC<HeroTileProps> = ({
  eventName,
  eventYear,
  eventBlurb,
}) => {
  return (
    <div className={heroTileStyles}>
      <h1
        className="-mt-20 text-7xl font-black text-[#FFFF] drop-shadow-lg md:m-0 md:text-center md:text-7xl"
        style={{
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
        }}
      >
        {" "}
        {eventName}
        <span className="text-[#BAFBE4]"> {eventYear}</span>
      </h1>
      <strong className="my-8 flex flex-wrap justify-center text-2xl text-[#7055FD] md:px-40 md:text-center lg:px-72">
        {eventBlurb}
      </strong>
    </div>
  );
};

// Define PropTypes for HeroTile
HeroTile.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventYear: PropTypes.string.isRequired,
  eventBlurb: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
};

const HeroSection = () => {
  return (
    <div className={heroSectionStyles}>
      <div className="relative flex h-screen items-center justify-center">
        <Image
          src={HeroSectionBackground}
          alt="Landing page background"
          layout="fill"
          placeholder="blur"
          objectFit="cover"
        />
        {HERO_SECTION.map((values, index) => (
          <div key={index}>
            <HeroTile {...values} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
