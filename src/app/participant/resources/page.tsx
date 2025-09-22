import Image from "next/image";
import Resources from "@/components/resources/resources";

export default function ResourcePage() {
  return (
    <div className="flex flex-col gap-12 bg-light-grey py-10">
      <div className="flex flex-row justify-center text-center">
        <Image
          src="/svgs/resources/greenAccent.svg"
          alt="Green Accent"
          width={25}
          height={25}
          className="pointer-events-none -mt-10"
        />
        <h1 className="whitespace-nowrap text-center text-2xl font-extrabold text-awesomer-purple md:text-4xl">
          Resources
        </h1>
      </div>

      <Resources />
      <div className="flex flex-row justify-center text-center">
        <h1 className="whitespace-nowrap text-center text-2xl font-extrabold text-awesomer-purple md:text-4xl">
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
    </div>
  );
}
