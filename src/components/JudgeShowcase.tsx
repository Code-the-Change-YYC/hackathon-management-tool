import Image from "next/image";

import imageplaceholder from "@/components/imgplaceholder.png";

const JudgeShowcase = () => {
  type Judge = {
    judgeImg: string;
    judgeName: string;
    judgeCompany: string;
  };

  const judges: Judge[] = [
    {
      judgeImg: imageplaceholder.src,
      judgeName: "Topan Budiman",
      judgeCompany: "Vena Solutions",
    },
    {
      judgeImg: imageplaceholder.src,

      judgeName: "Ideen Banijamali",
      judgeCompany: "Garmin",
    },
    {
      judgeImg: imageplaceholder.src,

      judgeName: "Cat",
      judgeCompany: "Meow",
    },
    {
      judgeImg: imageplaceholder.src,
      judgeName: "Topan Budiman",
      judgeCompany: "Vena Solutions",
    },
    {
      judgeImg: imageplaceholder.src,

      judgeName: "Ideen Banijamali",
      judgeCompany: "Garmin",
    },
    {
      judgeImg: imageplaceholder.src,

      judgeName: "Cat",
      judgeCompany: "Meow",
    },
    {
      judgeImg: imageplaceholder.src,
      judgeName: "Topan Budiman",
      judgeCompany: "Vena Solutions",
    },
    {
      judgeImg: imageplaceholder.src,

      judgeName: "Ideen Banijamali",
      judgeCompany: "Garmin",
    },
    {
      judgeImg: imageplaceholder.src,

      judgeName: "Cat",
      judgeCompany: "Meow",
    },
  ];

  return (
    <div className="mx-10 my-5 flex flex-col">
      <div className="ml-5 flex flex-row">
        <h1 className="text-2xl font-extrabold">Judges</h1>
      </div>
      <div className="mb-5 flex w-full flex-row flex-wrap justify-center">
        {judges.map((judge, index) => (
          <div
            className="flex w-1/2 flex-row gap-5 py-10 sm:w-1/3 sm:justify-center"
            key={index}
          >
            <div className="relative ml-3 size-24 min-w-24 overflow-hidden rounded-full sm:ml-10 sm:size-36 sm:min-w-36">
              <Image
                src={judge.judgeImg}
                alt="Profile Picture"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-extrabold text-awesome-purple">
                {judge.judgeName}
              </p>
              <p>{judge.judgeCompany}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudgeShowcase;
