import type { HackathonDetails } from "@/app/contentfulTypes";

import HeroCallToAction from "./HeroCallToAction";

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

const HeroSectionTile = ({
  hackathonDetails,
}: {
  hackathonDetails: HackathonDetails;
}) => {
  const eventDate = new Date(hackathonDetails.fields.eventDate);
  const { eventBlurb, eventName } = hackathonDetails.fields;
  const eventYear = eventDate.getFullYear();

  return (
    <div className={"flex flex-col px-4 pt-10 md:items-center md:px-0 "}>
      <h1
        className="flex-wrap text-5xl font-black text-pastel-green drop-shadow-lg md:text-center md:text-6xl"
        style={HERO_HEADER_STYLE}
      >
        <span className="text-white">{eventName} </span> {" " + eventYear}
      </h1>
      <strong className="flex w-full max-w-7xl flex-wrap justify-center py-4 text-xl text-awesomer-purple opacity-95 md:text-center md:text-xl">
        {eventBlurb}
      </strong>
      <HeroCallToAction />
    </div>
  );
};

export default HeroSectionTile;
