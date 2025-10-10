import HeroCallToAction from "./HeroCallToAction";

const EVENT_BLURB =
  "Hack the Change is a hybrid two-day for-charity hackathon with the mission of coding a better world together.";
const EVENT_NAME = "Hack the Change";

const HeroSectionTile = ({ eventStartDate }: { eventStartDate: Date }) => {
  const eventYear = eventStartDate.getFullYear() ?? "";

  return (
    <div className={"flex flex-col px-4 md:items-center md:px-0 md:pt-16 "}>
      <h1 className="text-shadow-title flex-wrap text-5xl font-black text-pastel-green drop-shadow-lg md:text-center md:text-6xl">
        <span className="text-white">{EVENT_NAME} </span> {" " + eventYear}
      </h1>
      <strong className="text-shadow-outline flex w-full max-w-7xl flex-wrap justify-center rounded-lg p-2 text-xl text-pastel-green opacity-95 drop-shadow-lg md:py-4 md:text-center md:text-xl md:text-awesomer-purple ">
        {EVENT_BLURB}
      </strong>
      <HeroCallToAction />
    </div>
  );
};

export default HeroSectionTile;
