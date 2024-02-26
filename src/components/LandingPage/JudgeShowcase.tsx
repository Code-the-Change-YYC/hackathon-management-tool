import Image from "next/image";

const imageplaceholder = "/images/imgplaceholder.png";
const squigglySvg = "/svgs/judgingCriteria/squiggly_line.svg";

const JudgeShowcase = () => {
  type Judge = {
    judgeImg: string;
    judgeName: string;
    judgeCompany: string;
  };

  const judges: Judge[] = [
    {
      judgeImg: imageplaceholder,
      judgeName: "Topan Budiman",
      judgeCompany: "Vena Solutions",
    },
    {
      judgeImg: imageplaceholder,

      judgeName: "Ideen Banijamali",
      judgeCompany: "Garmin",
    },
    {
      judgeImg: imageplaceholder,

      judgeName: "Cat",
      judgeCompany: "Meow",
    },
    {
      judgeImg: imageplaceholder,
      judgeName: "Topan Budiman",
      judgeCompany: "Vena Solutions",
    },
    {
      judgeImg: imageplaceholder,

      judgeName: "Ideen Banijamali",
      judgeCompany: "Garmin",
    },
    {
      judgeImg: imageplaceholder,

      judgeName: "Cat",
      judgeCompany: "Meow",
    },
    {
      judgeImg: imageplaceholder,
      judgeName: "Topan Budiman",
      judgeCompany: "Vena Solutions",
    },
    {
      judgeImg: imageplaceholder,

      judgeName: "Ideen Banijamali",
      judgeCompany: "Garmin",
    },
    {
      judgeImg: imageplaceholder,

      judgeName: "Cat",
      judgeCompany: "Meow",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-center bg-white p-10">
      <div className="flex w-fit flex-col items-center sm:w-1/4 sm:pr-5">
        <h1 className="text-2xl font-extrabold">Judges</h1>
        <Image
          src={squigglySvg}
          alt="squiggly line"
          width={120}
          height={20}
        ></Image>
      </div>
      <div className="flex w-full flex-row flex-wrap">
        {judges.map((judge, index) => (
          <div
            className="flex w-1/2 flex-row py-10 sm:w-1/3 sm:justify-center"
            key={index}
          >
            <div className="flex flex-row gap-2 sm:gap-3">
              <div className="relative size-16 min-w-16 overflow-hidden rounded-full sm:size-24 sm:min-w-24">
                <Image
                  src={judge.judgeImg}
                  alt="Profile Picture"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-extrabold text-awesome-purple sm:text-base">
                  {judge.judgeName}
                </p>
                <p className="text-xs sm:text-base">{judge.judgeCompany}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudgeShowcase;
