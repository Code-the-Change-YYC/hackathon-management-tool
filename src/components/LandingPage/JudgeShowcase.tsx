import Image from "next/image";

import { fetchContent } from "@/app/actions";

const squigglySvg = "/svgs/judgingCriteria/squiggly_line.svg";

export default async function JudgeShowcase() {
  const judges = await fetchContent("hackathonJudge");
  return (
    <div className="flex flex-col justify-center bg-white p-10">
      <div className="flex flex-col items-center sm:w-1/4 sm:pr-5">
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
          <div className="flex w-1/3 justify-center py-5 pl-7" key={index}>
            <div className="flex flex-row items-center gap-4">
              <div className="relative size-16 overflow-hidden rounded-full sm:size-24">
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
                <p className="w-36 text-xs font-extrabold text-awesome-purple sm:text-base">
                  {judge.fields.judgeName}
                </p>
                <p className="w-36 text-xs sm:text-base">
                  {judge.fields.judgeCompany}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
