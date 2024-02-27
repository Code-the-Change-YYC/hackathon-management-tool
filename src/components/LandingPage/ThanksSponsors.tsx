import Image from "next/image";

const leftSponsorSvg = "/svgs/judgingCriteria/leftSponsorSvg.svg";
const rightSponsorSvg = "/svgs/judgingCriteria/rightSponsorSvg.svg";
const imageplaceholder = "/images/imgplaceholder.png";

const ThankSponsors = () => {
  type Sponsor = {
    sponsorOrder: number;
    sponsorImg: string;
    sponsorName: string;
    sponsorPage: string;
  };

  const sponsors: Sponsor[] = [
    {
      sponsorOrder: 3,
      sponsorImg: imageplaceholder,
      sponsorName: "Sponsor 1",
      sponsorPage: "https://www.google.com",
    },
    {
      sponsorOrder: 2,
      sponsorImg: imageplaceholder,
      sponsorName: "Sponsor 2",
      sponsorPage: "https://www.google.com",
    },
    {
      sponsorOrder: 3,
      sponsorImg: imageplaceholder,
      sponsorName: "Sponsor 3",
      sponsorPage: "https://www.google.com",
    },
    {
      sponsorOrder: 1,
      sponsorImg: imageplaceholder,
      sponsorName: "Sponsor 4",
      sponsorPage: "https://www.google.com",
    },
    {
      sponsorOrder: 1,
      sponsorImg: imageplaceholder,
      sponsorName: "Sponsor 5",
      sponsorPage: "https://www.google.com",
    },
  ];

  const sortedSponsors = sponsors.sort(
    (a, b) => a.sponsorOrder - b.sponsorOrder,
  );

  return (
    <div className="flex flex-col items-center justify-center pb-12 pt-28">
      <div className="z-20 mb-10 flex w-1/4 flex-col items-center gap-3">
        <div className="absolute  left-28 z-10 h-36 w-1/3 overflow-hidden">
          <Image src={leftSponsorSvg} alt="squiggly lines" fill={true} />
        </div>
        <div className="absolute  right-24 z-10 h-32 w-1/3 overflow-hidden">
          <Image src={rightSponsorSvg} alt="squiggly lines" fill={true} />
        </div>
        <h1 className="text-s text-center font-extrabold sm:text-3xl">
          Thank you to our sponsors
        </h1>

        <p className="w-11/12 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="flex w-full flex-row justify-around px-8 py-5">
        {sortedSponsors.map((sponsor, index) => (
          <div className="flex flex-row gap-2 sm:gap-3" key={index}>
            <div className="group flex flex-col gap-3">
              <div className=" relative size-16 min-w-16 overflow-hidden rounded-full sm:size-24 sm:min-w-24">
                <a
                  href={sponsor.sponsorPage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={sponsor.sponsorImg}
                    alt="Sponsor Image"
                    objectFit="cover"
                    layout="fill"
                  />
                </a>
              </div>
              <p className="inset-0 text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                {sponsor.sponsorName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThankSponsors;
