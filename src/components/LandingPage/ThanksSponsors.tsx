import Image from "next/image";

import { fetchContent } from "@/app/actions";
import type { HackathonSponsor } from "@/app/contentfulTypes";

const leftSponsorSvg = "/svgs/judgingCriteria/leftSponsorSvg.svg";
const rightSponsorSvg = "/svgs/judgingCriteria/rightSponsorSvg.svg";
const leftSponsorSvgSmall = "/svgs/judgingCriteria/leftSponsorSvgSmall.svg";
const rightSponsorSvgSmall = "/svgs/judgingCriteria/rightSponsorSvgSmall.svg";

export default async function ThankSponsors() {
  const IMAGE_CLASS =
    "relative size-12 min-w-12 overflow-hidden rounded-full duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:transition-transform sm:size-28 sm:min-w-28";

  const sponsors: HackathonSponsor[] = (await fetchContent(
    "hackathonSponsor",
  )) as HackathonSponsor[];
  console.log(sponsors);
  const sortedSponsors = sponsors.sort(
    (a, b) => a.fields.sponsorOrder - b.fields.sponsorOrder,
  );

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden pb-12 pt-10">
      <div className="flex h-48 w-full justify-center">
        <div className="absolute -left-12 top-24 z-20  size-44 sm:hidden">
          <Image
            src={leftSponsorSvgSmall}
            alt="squiggly lines"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative z-10 hidden w-2/5 overflow-hidden sm:flex">
          <Image
            src={leftSponsorSvg}
            alt="squiggly lines"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex-end flex h-full max-w-[315px] flex-col justify-end sm:max-w-[395px]">
          <h1 className="z-30 mb-4 text-center text-2xl font-extrabold sm:max-w-none sm:text-3xl">
            Thank you to our sponsors
          </h1>

          <p className="w-11/2 text-center text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="absolute -right-12 z-20 size-44 sm:hidden">
          <Image
            src={rightSponsorSvgSmall}
            alt="squiggly lines"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative z-20 hidden w-2/5 overflow-hidden sm:flex">
          <Image
            src={rightSponsorSvg}
            alt="squiggly lines"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="flex w-full flex-row justify-around px-8 pt-10">
        {sortedSponsors.map((sponsor, index) => (
          <div className="flex flex-row  gap-2 sm:gap-3" key={index}>
            <div className="group flex flex-col items-center gap-3">
              <div className={IMAGE_CLASS}>
                <a
                  href={sponsor.fields.sponsorPage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={
                      sponsor.fields.sponsorImg.fields.file?.url
                        ?.toString()
                        .replace("//", "https://") ?? ""
                    }
                    alt="Sponsor Image"
                    style={{ objectFit: "contain" }}
                    fill
                  />
                </a>
              </div>
              <p className="inset-0 text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                {sponsor.fields.sponsorName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
