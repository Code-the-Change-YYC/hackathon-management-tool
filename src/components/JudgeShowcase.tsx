import Image from "next/image";

const imageplaceholder = "/images/imgplaceholder.png";

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
    <div className="flex flex-col bg-white px-10 py-5">
      <div className="flex w-fit flex-col items-center sm:w-1/4 sm:pr-5">
        <h1 className="text-2xl font-extrabold">Judges</h1>
        <svg
          width="120"
          height="20"
          viewBox="0 0 136 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 16.0441C22.3333 10.2108 75.4 -0.355907 133 4.04409"
            stroke="#00D3A9"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M44.5 19.544C53.3333 16.2107 81.4 9.84402 123 11.044"
            stroke="#00D3A9"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
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
