import { fetchContent } from "@/app/actions";
import type { PastHackathonWinner } from "@/app/contentfulTypes";
import { Underline } from "@/utils/text-utils";
import WinnerCard from "./WinnerCard";

export default async function PastWinners() {
  const data = await fetchContent("pastHackathonWinner");
  const pastWinners = data.map((el) => el.fields);
  const sortedPastWinners = pastWinners
    .sort((a, b) => (a.teamRanking ?? 0) - (b.teamRanking ?? 0))
    .reduce(
      (acc, el, index) => (index % 2 ? [...acc, el] : [el, ...acc]),
      [] as PastHackathonWinner[],
    );
  return (
    <div className=" flex flex-col gap-2 bg-fuzzy-peach lg:p-10 ">
      <h1 className="text-nowrap p-4 text-2xl font-extrabold sm:w-1/4">
        <Underline noTick>
          {" Previous Year's  "}
          <span className="pl-1 italic text-awesomer-purple">Winners</span>
        </Underline>
      </h1>
      <div className="flex w-full snap-x items-center justify-center overflow-x-auto py-4 sm:p-0 lg:overflow-visible">
        <ul className="flex max-h-screen w-full max-w-screen-2xl justify-around gap-2 sm:aspect-auto">
          {Object.entries(sortedPastWinners).map(([key, value], index) => (
            <WinnerCard
              pastWinnersArraySize={sortedPastWinners.length}
              pastWinner={value}
              key={key}
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
