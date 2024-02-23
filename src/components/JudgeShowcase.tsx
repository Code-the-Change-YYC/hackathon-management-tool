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
      <div className="ml-5 flex flex-row">
        <h1 className="text-2xl font-extrabold">Judges</h1>
      </div>
      <div className="mb-5 flex w-full flex-row flex-wrap justify-center">
        {judges.map((judge, index) => (
          <div
            className="flex w-1/2 flex-row py-10 sm:w-1/3 sm:justify-center"
            key={index}
          >
            <div className="flex flex-row gap-3">
              <div className="relative size-20 min-w-20 overflow-hidden rounded-full sm:size-28 sm:min-w-28">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudgeShowcase;
