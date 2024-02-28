import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import HeroSectionBackground from "/public/images/landingpage/hero_section_background.png";

const heroSectionStyles =
  "flex flex-col relative flex h-screen items-center justify-center";
// const heroTileStyles = "mx-10 md:m-0 ";
const heroTileStyles = "mx-10 mt:m-72 md:mt-10  ";

const linkStyles = "my-5 flex justify-start font-bold md:justify-center";
const webPageContainerStyles =
  "bg-[#00D3A9] flex justify-center items-center rounded-[5px] md:w-[1000px] mx-auto max-h-[100vh] p-24";
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
      <div>
        <h1
          className="text-7xl font-black text-[#FFFF] drop-shadow-lg md:m-0 md:text-center md:text-7xl"
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
        <strong className="my-8 flex flex-wrap justify-center text-2xl text-[#7055FD] opacity-95 md:px-40 md:text-center lg:px-72">
          {eventBlurb}
        </strong>
      </div>
      <div className={linkStyles}>
        <Link href="/" legacyBehavior>
          <div className=" cursor-pointer rounded-3xl border-4 border-white bg-[#7055FD] p-4 text-2xl text-white opacity-90 hover:opacity-70">
            Join Hackathon
          </div>
        </Link>
      </div>
      <div className={linkStyles}>
        <p>
          Already registered?
          <Link href="/" legacyBehavior>
            <span className="cursor-pointer text-[#7055FD] opacity-90 hover:opacity-70">
              {" "}
              Sign in
            </span>
          </Link>
        </p>
      </div>
      <div className={webPageContainerStyles}>hello</div>
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
  );
};

export default HeroSection;
