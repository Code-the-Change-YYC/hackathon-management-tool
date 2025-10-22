import Image from "next/image";
import Mentors from "@/components/resources/mentors";
import Resources from "@/components/resources/resources";

export default function ResourcePage() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/svgs/resources/greenSquiggly.svg"
        alt="Green Squiggly"
        fill
        className="pointer-events-none opacity-0 md:-mt-[450px] md:opacity-100 lg:-mt-[400px] xl:-mt-80 2xl:-mt-56"
      />
      <Image
        src="/svgs/resources/purpleSquiggly.svg"
        alt="Purple Squiggly"
        fill
        className="pointer-events-none opacity-0 md:-mt-64 md:opacity-100 lg:-mt-40 xl:-mt-10 2xl:opacity-0"
      />
      <Image
        src="/svgs/resources/pinkSquiggly.svg"
        alt="Pink Squiggly"
        fill
        className="pointer-events-none opacity-0 md:mt-[540px] md:opacity-100 lg:mt-[600px] xl:mt-[400px] 2xl:mt-52"
      />
      <Image
        src="/svgs/resources/orangeSquiggly.svg"
        alt="Orange Squiggly"
        fill
        className="pointer-events-none rotate-180 opacity-0 md:mt-[800px] md:opacity-100 lg:mt-[900px] xl:mt-[680px] 2xl:mt-[430px]"
      />
      <div className="z-10 flex flex-col gap-12 bg-light-grey py-10">
        <div className="mt-2 flex flex-row justify-center text-center">
          <Image
            src="/svgs/resources/greenAccent.svg"
            alt="Green Accent"
            width={25}
            height={25}
            className="pointer-events-none -mt-10"
          />
          <h1 className="whitespace-nowrap text-center text-3xl font-extrabold text-awesomer-purple md:text-4xl">
            Resources
          </h1>
        </div>
        <Resources />

        <div className="mt-8 flex flex-row justify-center text-center">
          <h1 className="z-10 whitespace-nowrap text-center text-3xl font-extrabold text-awesomer-purple md:text-4xl">
            Mentors
          </h1>
          <Image
            src="/svgs/resources/pinkAccent.svg"
            alt="Pink Accent"
            width={25}
            height={25}
            className="pointer-events-none -mt-8"
          />
        </div>
        <Mentors />
      </div>
    </div>
  );
}
