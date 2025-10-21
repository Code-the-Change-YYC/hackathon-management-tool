import Image from "next/image";
import { fetchContent } from "@/app/actions";

const squigglySvg = "/svgs/judgingCriteria/squiggly_line.svg";

export default async function JudgeShowcase() {
  const judges = await fetchContent("hackathonJudge");
  return (
    <div className="flex flex-col justify-center bg-white p-10 py-20">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
          Judges
        </h1>
        <Image
          src={squigglySvg}
          alt="squiggly line"
          width={160}
          height={24}
          className="mt-2"
        ></Image>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {judges.map((judge, index) => (
          <div
            className="group flex w-full justify-center transition-all duration-300 hover:scale-105"
            key={index}
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative size-32 overflow-hidden rounded-full shadow-lg transition-all duration-300 group-hover:shadow-2xl md:size-36">
                <Image
                  src={
                    judge.fields.judgeImg.fields.file?.url
                      ?.toString()
                      .replace("//", "https://") ?? ""
                  }
                  alt={judge.fields.judgeName}
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="w-40 text-center text-base font-extrabold text-awesome-purple transition-colors duration-300 group-hover:text-awesomer-purple sm:text-start sm:text-lg md:text-xl">
                  {judge.fields.judgeName}
                </p>
                <p className="w-40 text-center text-sm text-gray-700 sm:text-start sm:text-base md:text-lg">
                  {judge.fields.judgeCompany}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-2xl font-semibold text-gray-600 md:text-3xl">
        Full List Coming Soon!
      </p>
    </div>
  );
}
