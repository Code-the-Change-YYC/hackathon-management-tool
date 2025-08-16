import type { HackathonDetails } from "@/app/contentfulTypes";
import HeroCallToAction from "./HeroCallToAction";

const HeroSectionTile = ({
  hackathonDetails,
}: {
  hackathonDetails: HackathonDetails;
}) => {
  const eventDate = new Date(hackathonDetails.eventDate);
  const { eventBlurb, eventName } = hackathonDetails;
  const eventYear = eventDate.getFullYear();

  return (
    <div className={"flex flex-col px-4 md:items-center md:px-0 md:pt-16 "}>
      <h1 className="text-shadow-title flex-wrap text-5xl font-black text-pastel-green drop-shadow-lg md:text-center md:text-6xl">
        <span className="text-white">{eventName} </span> {" " + eventYear}
      </h1>
      <strong className="text-shadow-outline flex w-full max-w-7xl flex-wrap justify-center rounded-lg p-2 text-xl text-pastel-green opacity-95 drop-shadow-lg md:py-4 md:text-center md:text-xl md:text-awesomer-purple ">
        {eventBlurb}
      </strong>
      <HeroCallToAction />
    </div>
  );
};

export default HeroSectionTile;
