import Image from "next/image";

import { fetchContent } from "../actions";

export const dynamic = "force-dynamic";
// View Example: http://localhost:3000/contentfulExample
// See Entry on contentful: https://app.contentful.com/spaces/963e09izo0py/entries/vorGljUv05IACsXw4LUkr?focusedField=judgeName
// Make sure to populate the .env file with the necessary credentials
export default async function page() {
  return (
    <div>
      <h1>contentful-example-page</h1>
      <MyComponent />
    </div>
  );
}

async function MyComponent() {
  const alumni = await fetchContent("hackathonJudge");
  const judgeImg =
    alumni[0]?.fields?.judgeImg?.fields?.file?.url
      ?.toString()
      .replace("//", "https://") ?? "";
  const judgeInfo = {
    judgeName: alumni[0].fields.judgeName,
    judgeCompany: alumni[0].fields.judgeCompany,
    judgeImg: judgeImg,
  };
  console.log(judgeInfo);
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {JSON.stringify(judgeInfo, null, 2)}
      <div className="relative aspect-square size-48">
        <Image fill src={judgeImg} alt={""} className="rounded-full" />
        {
          "      // Make sure to populate the .env file with the necessary credentials"
        }
      </div>
    </div>
  );
}
