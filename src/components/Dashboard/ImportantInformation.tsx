import Image from "next/image";

import ImportantInfoIcon from "@/images/dashboard/ImportantInfoIcon.png";
import { formatDate } from "@/utils/date-utils";

import Card from "./Card";

export default function ImportantInformation() {
  const openingCeremony = {
    location: "ICT",
    time: new Date("November 23, 2024 09:00:00"),
  };
  const closingCeremony = {
    location: "ICT",
    time: new Date("November 24, 2024 18:00:00"),
  };
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
          <p>Location: {openingCeremony.location}</p>
          <p>Time: {formatDate(openingCeremony.time)}</p>
        </div>
        <div className="text-start text-2xl font-normal">
          <h1 className="pb-2 text-3xl font-bold">Closing Ceremony</h1>
          <p>Location: {closingCeremony.location}</p>
          <p>Time: {formatDate(closingCeremony.time)}</p>
        </div>
      </div>
    </Card>
  );
}
