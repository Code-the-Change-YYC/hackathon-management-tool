import { Underline } from "@/utils/text-utils";

import WinnerCard from "./WinnerCard";

export type PastWinner = {
  name: string;
  description: string;
  image: string;
  team: string;
  rank: number;
  award: string;
  link: string;
};

const pastWinners: PastWinner[] = [
  {
    name: "Seed-Pod",
    description: "A seed that grows into a pod.",
    image: "seed-pod.jpg",
    team: "Team 1",
    rank: 1,
    award: "2024 Winner",
    link: "https://www.youtube.com/watch?v=mCdA4bJAGGk&t=19s",
  },
  {
    name: "Seed-Pod",
    description: "A seed that grows into a pod.",
    image: "seed-pod.jpg",
    team: "Team 2",
    rank: 2,
    award: "2024 Runner Up",
    link: "https://www.youtube.com/watch?v=mCdA4bJAGGk&t=19s",
  },
  {
    award: "Best Design",
    name: "Seed-Pod",
    description: "A seed that grows into a pod.",
    image: "seed-pod.jpg",
    team: "Team Solo Mid",
    rank: 3,
    link: "https://www.youtube.com/watch?v=mCdA4bJAGGk&t=19s",
  },
  {
    award: "Best Presentation",
    name: "Seed-Pod",
    description: "A seed that grows into a pod.",
    image: "seed-pod.jpg",
    team: "Awesome team poggers",
    rank: 4,
    link: "https://www.youtube.com/watch?v=mCdA4bJAGGk&t=19s",
  },
  {
    award: "Best Impact",
    name: "Seed-Pod",
    description: "A seed that grows into a pod.",
    image: "seed-pod.jpg",
    team: "Justin's cool team",
    rank: 5,
    link: "https://www.youtube.com/watch?v=mCdA4bJAGGk&t=19s",
  },
] as const;

export default function PastWinners() {
  const sortedPastWinners = pastWinners.reduce(
    (acc, el) => (el.rank % 2 ? [...acc, el] : [el, ...acc]),
    [] as PastWinner[],
  );

  return (
    <div className=" flex flex-col gap-2 bg-fuzzy-peach lg:p-10 ">
      <h1 className="text-nowrap p-4 text-2xl font-extrabold sm:w-1/4">
        <Underline noTick>
          {" Last Year's  "}
          <span className="pl-1 italic text-awesomer-purple">Winners</span>
        </Underline>
      </h1>
      <div className="flex w-full snap-x items-center justify-center overflow-x-auto lg:overflow-visible">
        <ul className="flex max-h-screen w-full max-w-screen-2xl justify-around gap-2  sm:aspect-auto">
          {Object.entries(sortedPastWinners).map(([key, value], index) => (
            <WinnerCard
              pastWinnersArraySize={pastWinners.length}
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
