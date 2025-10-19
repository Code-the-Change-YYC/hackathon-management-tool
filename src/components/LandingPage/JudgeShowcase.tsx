import Image from "next/image";
import { fetchContent } from "@/app/actions";

const squigglySvg = "/svgs/judgingCriteria/squiggly_line.svg";

export default async function JudgeShowcase() {
  const judges = await fetchContent("hackathonJudge");
  return (
    <div className="flex flex-col justify-center bg-white p-10">
      <div className="mb-4 flex flex-col items-center sm:w-1/4 sm:pr-5">
        <h1 className="text-2xl font-extrabold">Judges</h1>
        <Image
          src={squigglySvg}
          alt="squiggly line"
          width={120}
          height={20}
        ></Image>
      </div>
      <div className="grid w-full grid-cols-2 md:grid-cols-3">
        {judges.map((judge, index) => (
          <div className="flex w-full justify-center py-5" key={index}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative size-24 overflow-hidden rounded-full">
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
                <p className="w-36 text-center text-xs font-extrabold text-awesome-purple sm:text-start sm:text-base">
                  {judge.fields.judgeName}
                </p>
                <p className="w-36 text-center text-xs sm:text-start sm:text-base">
                  {judge.fields.judgeCompany}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-2xl">Full List Coming Soon!</p>
    </div>
  );
}
