import Image, { type StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import ABOUT_THE_CHALLENGE_IMAGE from "@/images/landingpage/AboutTheChallenge.png";
import PRIZES_IMAGE from "@/images/landingpage/prizes.png";
import REQUIREMENTS_IMAGE from "@/images/landingpage/requirements.png";

const CHALLENGE_QUOTES_SVG = "/svgs/landingPage/challenge_quotes.svg";
const ABOUT_THE_CHALLENGE_BLURB = `Hack the Change aims to inspire students across Canada to leverage technology to enact social change. We’re looking for creative and innovative solutions to existing problems, with the goal of coding a better tomorrow.`;
const ABOUT_THE_CHALLENGE_TITLE = (
  <div className="flex flex-row flex-nowrap text-nowrap">
    <h1 className="text-3xl font-semibold">
      About the
      <span className="italic text-fuzzy-peach"> Challenge</span>
    </h1>
    <Image
      src={CHALLENGE_QUOTES_SVG}
      width={20}
      height={20}
      alt="Challenge quotes"
      className=" mb-4 ml-1 select-none"
    />
  </div>
);

const REQUIREMENTS_QUOTES_SVG = "/svgs/landingPage/requirements_quotes.svg";
const REQUIREMENTS_BLURB = `Requirements: Open to all Canadian students, at the university, college, or high school level. (Must be an accredited institution)`;
const REQUIREMENTS_TITLE = (
  <div className="flex flex-row text-3xl font-semibold italic text-awesomer-purple">
    <Image
      src={REQUIREMENTS_QUOTES_SVG}
      width={20}
      height={20}
      alt="Challenge quotes"
      className=" mr-1 mt-2 select-none"
    />
    Requirements
  </div>
);

const PRIZES_QUOTES_SVG = "/svgs/landingPage/prizes_quotes.svg";
const PRIZES_BLURB = `Prizes: 1st place - $5,000 CAD; 2nd place - $3,000; 3rd place - $2,000; All prizes will be split between students and the charities of their choice.`;
const PRIZES_TITLE = (
  <div className="flex flex-row text-3xl font-semibold italic text-[#00AA88]">
    Prizes
    <Image
      src={PRIZES_QUOTES_SVG}
      width={20}
      height={20}
      alt="Challenge quotes"
      className=" ml-1 mt-2 select-none"
    />
  </div>
);
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
  return (
    <div
      className={twMerge(
        `flex w-full flex-row items-center justify-between gap-16  px-[5%] py-20`,
        bgColor,
        fontColor,
      )}
    >
      <div className={twMerge(`z-10 flex flex-col gap-4 `, fontColor)}>
        {title}
        <p className=" max-w-lg font-medium">{blurb}</p>
      </div>
      <div
        className={twMerge(
          "relative box-content hidden aspect-square w-2/3 min-w-48 max-w-96 lg:block",
          leftPosition && "order-first",
        )}
      >
        <Image
          src={sectionImage}
          alt="About the challenge image"
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
      <div className=" pointer-events-none hidden select-none lg:block ">
        <Image
          src="/svgs/landingPage/vector_2.svg"
          alt=""
          width={140}
          height={80}
          className="absolute  -left-28  top-52"
        />
        <Image
          src="/svgs/landingPage/vector_14.svg"
          alt=""
          width={436}
          height={90}
          className="absolute  top-[22rem]"
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
