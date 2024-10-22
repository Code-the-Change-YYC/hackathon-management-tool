import Image from "next/image";

import { fetchContent } from "@/app/actions";
import type { CeremonyDetails } from "@/app/contentfulTypes";
import ImportantInfoIcon from "@/images/dashboard/ImportantInfoIcon.png";
import { formatDate } from "@/utils/date-utils";

import Card from "./Card";

export default async function ImportantInformation() {
  const ceremonyDetails = (await fetchContent(
    "ceremonyDetails",
  )) as CeremonyDetails[];

  const details = ceremonyDetails[0].fields;
  const openingCeremonyDate = new Date(details.openingCeremonyDate);
  const closingCeremonyDate = new Date(details.closingCeremonyDate);

  return (
    <Card className="flex flex-col items-start  gap-4">
      <div className="flex items-center gap-4">
        <Image src={ImportantInfoIcon} alt={"Important Info Icon"} />
        <div className="text-start font-medium">
          Important <br /> Information
        </div>
      </div>
      <div className="grid w-full grid-flow-row gap-4 sm:grid-flow-col">
        <div className="text-start text-2xl font-normal">
          <h1 className="pb-2 text-3xl font-bold">Opening Ceremony</h1>
          <p>Location: {details.openingCeremonyLocation}</p>
          <p>Time: {formatDate(openingCeremonyDate)}</p>
        </div>
        <div className="text-start text-2xl font-normal">
          <h1 className="pb-2 text-3xl font-bold">Closing Ceremony</h1>
          <p>Location: {details.closingCeremonyLocation}</p>
          <p>Time: {formatDate(closingCeremonyDate)}</p>
        </div>
      </div>
    </Card>
  );
}
