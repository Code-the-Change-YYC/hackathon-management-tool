import Image from "next/image";

import { fetchContent } from "@/app/actions";

const leftSponsorSvg = "/svgs/judgingCriteria/leftSponsorSvg.svg";
const rightSponsorSvg = "/svgs/judgingCriteria/rightSponsorSvg.svg";

export default async function ThankSponsors() {
  const sponsors = await fetchContent("hackathonSponsor");
  const sortedSponsors = sponsors.sort(
    (a, b) => a.fields.sponsorOrder - b.fields.sponsorOrder,
  );

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden pb-12 ">
      <div className="flex w-full justify-center sm:h-48">
        <div className="relative z-10 overflow-hidden sm:flex sm:w-2/5">
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
            {`Without their support, this event wouldn't have been possible`}
          </p>
        </div>
        <div className="relative z-20 overflow-hidden sm:flex sm:w-2/5">
          <Image
            src={rightSponsorSvg}
            alt="squiggly lines"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-6 px-8 pt-10  md:grid-cols-4">
        {sortedSponsors.map((sponsor, index) => (
          <div
            className="flex flex-row items-center justify-center gap-2 sm:gap-3"
            key={index}
          >
            <div className="group flex flex-col items-center justify-center gap-3">
              <div className="relative duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:transition-transform ">
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
                    layout="intrinsic"
                    objectFit="contain"
                    width={150}
                    height={150}
                  />
                </a>
              </div>
              <p className="text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                {sponsor.fields.sponsorName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
