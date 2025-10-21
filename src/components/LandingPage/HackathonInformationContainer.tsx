import Image, { type StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import ABOUT_THE_CHALLENGE_IMAGE from "@/images/landingpage/AboutTheChallenge.png";
import PRIZES_IMAGE from "@/images/landingpage/prizes.png";
import REQUIREMENTS_IMAGE from "@/images/landingpage/requirements.png";

const CHALLENGE_QUOTES_SVG = "/svgs/landingPage/challenge_quotes.svg";
const ABOUT_THE_CHALLENGE_BLURB = `Hack the Change aims to inspire students across Canada to leverage technology to enact social change. We’re looking for creative and innovative solutions to existing problems, with the goal of coding a better tomorrow.`;
const ABOUT_THE_CHALLENGE_TITLE = (
  <div className="flex flex-row flex-wrap items-center">
    <h1 className="text-4xl font-semibold md:text-6xl lg:text-8xl">
      About the
      <span className="italic text-fuzzy-peach"> Challenge</span>
    </h1>
    <Image
      src={CHALLENGE_QUOTES_SVG}
      width={20}
      height={20}
      alt="Challenge quotes"
      className="mb-4 ml-1 select-none"
    />
  </div>
);

const REQUIREMENTS_QUOTES_SVG = "/svgs/landingPage/requirements_quotes.svg";
const REQUIREMENTS_BLURB = `Open to all Canadian students, at the university, college, or high school level.`;
const REQUIREMENTS_TITLE = (
  <div className="flex flex-row items-center text-4xl font-semibold italic text-awesomer-purple md:text-6xl lg:text-8xl">
    <Image
      src={REQUIREMENTS_QUOTES_SVG}
      width={20}
      height={20}
      alt="Challenge quotes"
      className="mr-1 mt-2 select-none"
    />
    Requirements
  </div>
);

const PRIZES_QUOTES_SVG = "/svgs/landingPage/prizes_quotes.svg";
const PRIZES_BLURB = `All prizes will be split between students and the charities of their choice.`;
const PRIZES_TITLE = (
  <div className="flex flex-row items-center text-6xl font-bold italic text-[#00AA88] md:text-8xl">
    Prizes
    <Image
      src={PRIZES_QUOTES_SVG}
      width={20}
      height={20}
      alt="Challenge quotes"
      className="ml-1 mt-2 select-none"
    />
  </div>
);

const PRIZES_DATA = [
  { place: "1st Place", amount: "$4,700", color: "bg-awesomer-purple" },
  { place: "2nd Place", amount: "$2,700", color: "bg-awesome-purple" },
  { place: "3rd Place", amount: "$2,000", color: "bg-lilac-purple" },
  {
    place: "Side Pots",
    amount: "$200",
    color: "bg-dark-pink",
    note: "AWS",
  },
  {
    place: "Side Pots",
    amount: "$200",
    color: "bg-dark-pink",
    note: "Hunter Hub for Entrepeneurial Thinking",
  },
  {
    place: "Side Pots",
    amount: "$200",
    color: "bg-dark-pink",
    note: "Arcurve",
  },
];
interface SectionProps {
  title: React.ReactNode;
  sectionImage: string | StaticImageData;
  leftPosition?: boolean;
  blurb: string;
  bgColor?: string;
  fontColor?: string;
}
const sectionInfo: SectionProps[] = [
  {
    sectionImage: ABOUT_THE_CHALLENGE_IMAGE,
    blurb: ABOUT_THE_CHALLENGE_BLURB,
    title: ABOUT_THE_CHALLENGE_TITLE,
    fontColor: "text-white",
    bgColor: "bg-awesomer-purple",
  },
  {
    sectionImage: REQUIREMENTS_IMAGE,
    blurb: REQUIREMENTS_BLURB,
    title: REQUIREMENTS_TITLE,
    fontColor: "text-black",
    bgColor: "bg-zinc-100",
    leftPosition: true,
  },
  {
    sectionImage: PRIZES_IMAGE,
    blurb: PRIZES_BLURB,
    title: PRIZES_TITLE,
    fontColor: "text-black",
    bgColor: "bg-fuzzy-peach",
  },
];
function SectionContainer({
  title,
  sectionImage,
  leftPosition,
  blurb,
  bgColor,
  fontColor,
}: SectionProps) {
  const isPrizesSection = title === PRIZES_TITLE;

  if (isPrizesSection) {
    return (
      <div
        className={twMerge(
          `flex w-full flex-col items-center justify-center gap-12 px-[5%] py-20`,
          bgColor,
          fontColor,
        )}
      >
        {title}

        <div className="z-10 flex w-full max-w-6xl flex-col items-center gap-12">
          <div className="grid w-full gap-4 md:flex md:items-end md:justify-center md:gap-8">
            <div className="flex flex-1 flex-col items-center md:order-2">
              <Image
                src="/svgs/admin/Kevin.svg"
                alt="Kevin mascot"
                width={300}
                height={300}
                className="-mb-8 hidden md:block"
              />
              <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-awesomer-purple p-6 shadow-2xl transition-all duration-200 hover:scale-105 md:mb-4 md:h-64 md:justify-end md:rounded-t-2xl md:p-8">
                <h2 className="text-3xl font-black text-gray-800 md:text-5xl">
                  🏆 1st
                </h2>
                <p className="text-5xl font-black text-white md:text-8xl">
                  $4,700
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center md:order-1">
              <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-awesome-purple p-4 shadow-xl transition-all duration-200 hover:scale-105 md:mb-4 md:h-48 md:justify-end md:rounded-t-2xl md:p-6">
                <h2 className="text-2xl font-black text-gray-800 md:text-4xl">
                  2nd
                </h2>
                <p className="text-4xl font-black text-white md:text-6xl">
                  $2,700
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center md:order-3">
              <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-lilac-purple p-4 shadow-xl transition-all duration-200 hover:scale-105 md:mb-4 md:h-40 md:justify-end md:rounded-t-2xl md:p-6">
                <h2 className="text-2xl font-black text-gray-800 md:text-4xl">
                  3rd
                </h2>
                <p className="text-4xl font-black text-white md:text-6xl">
                  $2,000
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              Side Pots
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {PRIZES_DATA.filter((p) => p.place === "Side Pots").map(
                (prize, index) => (
                  <div
                    key={index}
                    className={twMerge(
                      "flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg transition-all duration-500 hover:scale-105 md:p-8",
                      prize.color,
                    )}
                  >
                    <p className="text-4xl font-black text-white md:text-5xl">
                      {prize.amount}
                    </p>
                    {prize.note && (
                      <p className="mt-2 text-center text-sm font-bold text-gray-700 md:text-base">
                        {prize.note}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <p className="z-10 max-w-2xl text-center text-xl font-semibold md:text-2xl">
          {blurb}
        </p>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        `flex w-full flex-col items-center gap-8 px-[5%] py-12 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16`,
        bgColor,
        fontColor,
      )}
    >
      <div
        className={twMerge(
          "relative box-content aspect-square w-full max-w-sm md:max-w-md lg:hidden",
        )}
      >
        <Image
          src={sectionImage}
          alt="Section image"
          placeholder={typeof sectionImage === "string" ? undefined : "blur"}
          className="rounded-3xl"
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px"
        />
      </div>

      <div className={twMerge(`z-10 flex flex-col gap-4`, fontColor)}>
        {title}
        <p className="max-w-lg text-base font-medium md:text-lg">{blurb}</p>
      </div>

      <div
        className={twMerge(
          "relative box-content hidden aspect-square w-2/3 min-w-48 max-w-96 lg:block",
          leftPosition && "order-first",
        )}
      >
        <Image
          src={sectionImage}
          alt="Section image"
          placeholder={typeof sectionImage === "string" ? undefined : "blur"}
          className="rounded-3xl"
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 1000px"
        />
      </div>
    </div>
  );
}

export default function HackathonInformationContainer() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none hidden select-none lg:block">
        <Image
          src="/svgs/landingPage/vector_2.svg"
          alt=""
          width={140}
          height={80}
          className="absolute -left-28 top-52"
        />
        <Image
          src="/svgs/landingPage/vector_14.svg"
          alt=""
          width={436}
          height={90}
          className="absolute top-[22rem]"
        />
        <Image
          src="/svgs/landingPage/vector_15.svg"
          alt=""
          width={1022}
          height={410}
          className="absolute left-80 top-[47rem] w-full max-w-[99rem]"
        />
        <Image
          src="/svgs/landingPage/vector_6.svg"
          alt=""
          width={430}
          height={320}
          className="absolute top-[25rem] w-1/3 max-w-lg"
        />
        <Image
          src="/svgs/landingPage/vector_10.svg"
          alt=""
          width={815}
          height={448}
          className="absolute left-60 top-[50rem] w-2/3 max-w-7xl"
        />

        <Image
          src="/svgs/landingPage/vector_11.svg"
          alt=""
          width={200}
          height={65}
          className="absolute right-[25rem] top-[95rem] w-1/4 max-w-[25rem]"
        />
        <Image
          src="/svgs/landingPage/vector_16.svg"
          alt=""
          width={1465}
          height={210}
          className="absolute top-[85rem] w-full"
        />
      </div>
      {sectionInfo.map((section, index) => (
        <SectionContainer key={index} {...section} />
      ))}
    </div>
  );
}
