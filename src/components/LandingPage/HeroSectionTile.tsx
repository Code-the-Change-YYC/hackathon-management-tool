import HeroCallToAction from "./HeroCallToAction";

const EVENT_BLURB =
  "Hack the Change is a hybrid two-day for-charity hackathon with the mission of coding a better world together.";
const EVENT_NAME = "Hack the Change";

const HeroSectionTile = ({ eventStartDate }: { eventStartDate: Date }) => {
  const eventYear = eventStartDate.getFullYear() ?? "";

  return (
    <div
      className={
        "flex flex-col items-center justify-center px-4 pt-4 md:px-0 md:pt-16 "
      }
    >
      <h1 className="flex-wrap rounded-tl-lg rounded-tr-lg bg-white/80 p-3 text-center text-6xl font-black text-dark-pink drop-shadow-lg [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] md:rounded-lg md:bg-transparent md:p-0 md:text-9xl">
        <span className="text-dark-pink">{EVENT_NAME} </span> {" " + eventYear}
      </h1>
      <strong className="mb-8 flex w-full max-w-7xl flex-wrap justify-center rounded-bl-lg rounded-br-lg  bg-white/80 p-2 text-center text-3xl text-dark-pink opacity-95 drop-shadow-lg [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff] md:rounded-lg md:bg-transparent md:py-4 md:text-xl">
        {EVENT_BLURB}
      </strong>
      <HeroCallToAction />
    </div>
  );
};

export default HeroSectionTile;
