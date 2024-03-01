import Image from "next/image";

const leftSponsorSvg = "/svgs/judgingCriteria/leftSponsorSvg.svg";
const rightSponsorSvg = "/svgs/judgingCriteria/rightSponsorSvg.svg";
const imageplaceholder = "/images/imgplaceholder.png";

const ThankSponsors = () => {
  const IMAGE_CLASS =
    "relative size-12 min-w-12 overflow-hidden rounded-full duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:transition-transform sm:size-28 sm:min-w-28";

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
    <div className="relative flex flex-col items-center justify-center pb-12 pt-28">
      <div className="absolute -right-12 top-16 z-20 h-32 w-1/3 overflow-hidden sm:right-12 sm:top-8">
        <Image src={rightSponsorSvg} alt="squiggly lines" fill={true} />
      </div>
      <div className="absolute -left-12 top-20 z-10 h-28 w-1/3 overflow-hidden sm:left-12">
        <Image src={leftSponsorSvg} alt="squiggly lines" fill={true} />
      </div>
      <div className="sm:1/3 mb-10 flex w-3/4 flex-col items-center sm:max-w-none">
        <h1 className="z-30 mb-4 max-w-72 text-center text-2xl font-extrabold sm:max-w-none sm:text-3xl">
          Thank you to our sponsors
        </h1>

        <p className="w-full text-center sm:w-3/4 md:w-1/3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="flex w-full flex-row justify-around px-8 py-5">
        {sortedSponsors.map((sponsor, index) => (
          <div className="flex flex-row gap-2 sm:gap-3" key={index}>
            <div className="group flex flex-col gap-3">
              <div className={IMAGE_CLASS}>
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
