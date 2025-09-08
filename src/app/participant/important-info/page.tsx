import Image from "next/image";
import Carousel from "@/components/ImportantInfo/carousel";
import FaqInfo from "@/components/ImportantInfo/faqInfo";
import ProjectSubmission from "@/components/ImportantInfo/projectSubmission";

export default function ImportantInfo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-pastel-pink">
      <Image
        src="/svgs/importantInfo/starIcons.svg"
        alt="White stars"
        width={30}
        height={30}
        className="pointer-events-none absolute left-4 top-72 md:left-24 md:top-52 lg:left-36 lg:top-64"
      />
      <Image
        src="/svgs/importantInfo/starIcons.svg"
        alt="White stars"
        width={30}
        height={30}
        className="pointer-events-none absolute right-4 top-[870px] md:right-20 md:top-[760px] lg:right-36 lg:top-[730px]"
      />
      <div className="flex w-full flex-row items-center justify-center gap-2 md:gap-6">
        <Image
          src="/svgs/importantInfo/leftPinkSquiggly.svg"
          alt="Left Pink Squiggly"
          width={0}
          height={0}
          className="pointer-events-none mt-8 h-auto w-[20vw] max-w-96 opacity-0 md:opacity-100 lg:mt-14 xl:mt-20"
        />
        <h1 className="mt-10 whitespace-nowrap text-center text-3xl text-white md:mt-8 md:text-4xl lg:mt-10 xl:mt-16">
          Important Information
        </h1>
        <Image
          src="/svgs/importantInfo/rightPinkSquiggly.svg"
          alt="Right Pink Squiggly"
          width={0}
          height={0}
          className="pointer-events-none -mt-2 h-auto w-[20vw] max-w-96 opacity-0 md:opacity-100"
        />
      </div>

      <p className="mx-4 my-14 text-center text-lg font-semibold text-grey-purple/70">
        Here are the rules, code of conduct, steps to submit your project, tips
        for success, and answers to frequently asked questions (FAQs)!
      </p>
      <Carousel />
      <ProjectSubmission />
      <FaqInfo />
    </div>
  );
}
