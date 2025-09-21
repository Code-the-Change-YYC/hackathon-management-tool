import Image from "next/image";
import type React from "react";

type CarouselProps = {
  name: string;
  children: React.ReactNode;
};

export default function CarouselInfo({ name, children }: CarouselProps) {
  return (
    <div className="flex h-[580px] w-[250px] flex-col items-center gap-2 rounded-xl bg-grapefruit text-white md:h-[520px] md:w-[500px] md:gap-5 lg:h-[400px] lg:w-[700px]">
      <div className="mt-5 flex flex-col items-center">
        <h1 className="text-center text-lg">{name}</h1>
        <Image
          src="/svgs/importantInfo/greenUnderline.svg"
          alt="Green Underline"
          width={70}
          height={40}
          className="pointer-events-none"
        />
      </div>
      <div className="justify-center px-6 py-2 text-xs md:text-base">
        {children}
      </div>
    </div>
  );
}
