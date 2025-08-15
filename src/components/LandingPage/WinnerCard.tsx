import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { PastHackathonWinner } from "@/app/contentfulTypes";
import imgPlaceholder from "@/images/imgplaceholder.png";

const ColorCycles = [
  "bg-orange-300",
  "bg-awesomer-purple",
  "bg-red-500",
  "bg-emerald-500",
  "bg-dark-pink",
] as const;

export default function WinnerCard({
  pastWinner,
  className,
  index,
  pastWinnersArraySize,
}: {
  pastWinnersArraySize: number;
  pastWinner: PastHackathonWinner;
  className?: string;
  index: number;
}) {
  const scaleValue =
    (100 - 10 * Math.abs(index - Math.floor(pastWinnersArraySize / 2))) / 100;
  return (
    <li
      style={
        {
          backgroundImage: pastWinner.projectImage
            ? `url(${pastWinner.projectImage.fields.file?.url})`
            : `url(${imgPlaceholder.src})`,
          "--tw-scale-x": scaleValue,
          "--tw-scale-y": scaleValue,
        } as React.CSSProperties
      }
      className={twMerge(
        className,
        `scale-[${scaleValue}%] relative flex aspect-[9/18]  w-full min-w-40 scale-100 cursor-pointer snap-center rounded-3xl bg-cover bg-fixed bg-center bg-no-repeat shadow-2xl outline-4 outline-awesomer-purple drop-shadow-2xl transition-transform duration-300 hover:-translate-y-4 hover:outline`,
      )}
    >
      <Link
        href={
          pastWinner.link
            ? pastWinner.link
            : "https://www.youtube.com/watch?v=mCdA4bJAGGk&t=19s"
        }
        target="_blank"
        className="absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-black/50 via-black/0 to-black pb-4 shadow-2xl   drop-shadow-2xl  "
      >
        <div
          className={`${ColorCycles[index % ColorCycles.length]}  w-fit rounded-r-3xl px-3 py-1 text-xs font-bold tracking-wider text-white shadow-lg xl:text-xl`}
        >
          {pastWinner.awardName}
        </div>
        <div className="px-2 text-white">
          <h2 className="text-lg font-bold italic drop-shadow-xl xl:text-3xl">
            {pastWinner.projectName}
          </h2>
          <p
            title={pastWinner.projectDescription}
            className=" truncate text-sm xl:text-lg"
          >
            {pastWinner.projectDescription}
          </p>
        </div>
      </Link>
    </li>
  );
}
