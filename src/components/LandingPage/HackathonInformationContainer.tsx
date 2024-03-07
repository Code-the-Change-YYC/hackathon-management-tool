import Image from "next/image";

function SectionContainer({
  title,
  sectionImage,
  leftPosition,
  blurb,
  bgColor,
  fontColor,
}: {
  title: React.ReactNode;
  sectionImage: string;
  leftPosition?: boolean;
  blurb: string;
  bgColor?: string;
  fontColor?: string;
}) {
  return (
    <div
      className={`flex w-full flex-row items-center justify-between gap-16 ${bgColor} ${fontColor} px-[5%] py-20`}
    >
      <div className={`flex flex-col gap-4 ${fontColor}`}>
        {title}
        <p className=" max-w-lg font-medium">{blurb}</p>
      </div>
      <div
        className={`relative ${leftPosition && "order-first"} box-content hidden aspect-square w-2/3 min-w-48 max-w-96 rounded-lg md:block`}
      >
        <Image
          src={sectionImage}
          alt="About the challenge image"
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 1000px"
        />
      </div>
    </div>
  );
}

export default function HackathonInformationContainer() {
  const CHALLENGE_QUOTES_SVG = "/svgs/landingPage/challenge_quotes.svg";
  const ABOUT_THE_CHALLENGE_IMAGE = "/svgs/landingPage/about_the_challenge.svg";
  const ABOUT_THE_CHALLENGE_BLURB = `Hack the Change aims to inspire students across Canada to leverage technology to enact social change. We’re looking for creative and innovative solutions to existing problems, with the goal of coding a better tomorrow.`;
  const ABOUT_THE_CHALLENGE_TITLE = (
    <div className="flex flex-row flex-nowrap text-nowrap">
      <h1 className="  text-3xl font-semibold">
        About the
        <span className=" italic text-fuzzy-peach"> Challenge</span>
      </h1>
      <Image
        src={CHALLENGE_QUOTES_SVG}
        width={20}
        height={20}
        alt="Challenge quotes"
        className=" mb-4 ml-1"
      />
    </div>
  );

  const REQUIREMENTS_QUOTES_SVG = "/svgs/landingPage/requirements_quotes.svg";
  const REQUIREMENTS_IMAGE = "/svgs/landingPage/requirements.svg";
  const REQUIREMENTS_BLURB = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eius cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  const REQUIREMENTS_TITLE = (
    <div className="flex flex-row text-3xl font-semibold italic text-awesomer-purple">
      <Image
        src={REQUIREMENTS_QUOTES_SVG}
        width={20}
        height={20}
        alt="Challenge quotes"
        className=" mr-1 mt-2"
      />
      Requirements
    </div>
  );

  const PRIZES_QUOTES_SVG = "/svgs/landingPage/prizes_quotes.svg";
  const PRIZES_IMAGE = "/svgs/landingPage/prizes.svg";
  const PRIZES_BLURB = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eius cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  const PRIZES_TITLE = (
    <div className="flex flex-row text-3xl font-semibold italic text-[#00AA88]">
      Prizes
      <Image
        src={PRIZES_QUOTES_SVG}
        width={20}
        height={20}
        alt="Challenge quotes"
        className=" ml-1 mt-2"
      />
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <>
        <Image
          src="/svgs/landingPage/vector_2.svg"
          alt=""
          width={140}
          height={80}
          className="absolute  left-[-7rem]  top-[13rem] hidden lg:block"
        />
        <Image
          src="/svgs/landingPage/vector_14.svg"
          alt=""
          width={436}
          height={90}
          className="absolute  top-[22rem] hidden lg:block"
        />
        <Image
          src="/svgs/landingPage/vector_15.svg"
          alt=""
          width={1022}
          height={410}
          className="absolute left-[20rem] top-[47rem] hidden w-full max-w-[99rem] lg:block"
        />
        <Image
          src="/svgs/landingPage/vector_6.svg"
          alt=""
          width={430}
          height={320}
          className="absolute top-[25rem] hidden w-1/3 max-w-[32rem] lg:block"
        />
        <Image
          src="/svgs/landingPage/vector_10.svg"
          alt=""
          width={815}
          height={448}
          className="absolute left-[15rem] top-[50rem] hidden w-2/3 max-w-[80rem] lg:block"
        />

        <Image
          src="/svgs/landingPage/vector_11.svg"
          alt=""
          width={200}
          height={65}
          className="absolute right-[25rem] top-[95rem] hidden w-1/4 max-w-[25rem] lg:block"
        />
        <Image
          src="/svgs/landingPage/vector_16.svg"
          alt=""
          width={1465}
          height={210}
          className="absolute top-[85rem] hidden w-full lg:block"
        />
      </>

      <SectionContainer
        bgColor="bg-awesomer-purple"
        sectionImage={ABOUT_THE_CHALLENGE_IMAGE}
        blurb={ABOUT_THE_CHALLENGE_BLURB}
        title={ABOUT_THE_CHALLENGE_TITLE}
        fontColor="text-white"
      />
      <SectionContainer
        bgColor="bg-zinc-100"
        sectionImage={REQUIREMENTS_IMAGE}
        blurb={REQUIREMENTS_BLURB}
        title={REQUIREMENTS_TITLE}
        fontColor="text-black"
        leftPosition
      />
      <SectionContainer
        bgColor="bg-fuzzy-peach"
        sectionImage={PRIZES_IMAGE}
        blurb={PRIZES_BLURB}
        title={PRIZES_TITLE}
        fontColor="text-black"
      />
    </div>
  );
}
