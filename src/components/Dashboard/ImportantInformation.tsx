import Image from "next/image";
import Link from "next/link";
import { fetchContent } from "@/app/actions";
import type { CeremonyDetails } from "@/app/contentfulTypes";
import ImportantInfoIcon from "@/images/dashboard/ImportantInfoIcon.png";
// import { formatDate } from "@/utils/date-utils";
import Card from "./Card";

export default async function ImportantInformation() {
  const ceremonyDetailsArray = await fetchContent("ceremonyDetails");
  const ceremonyDetails = ceremonyDetailsArray[0]?.fields as CeremonyDetails;

  // const openingCeremonyDate = new Date(ceremonyDetails.openingCeremonyDate);
  // const closingCeremonyDate = new Date(ceremonyDetails.closingCeremonyDate);

  return (
    <Card className="flex h-full flex-col items-start justify-around gap-4">
      <div className="flex items-center gap-4">
        <Image
          className="transition duration-300 hover:opacity-90"
          src={ImportantInfoIcon}
          alt={"Important Info Icon"}
        />
        <div className="flex flex-col gap-2">
          <div className="text-start font-medium">
            Important <br /> Information
          </div>
          <Link
            href="/participant/important-info"
            className="text-left text-xl text-dark-grey/60 underline md:text-2xl"
          >
            View More
          </Link>
        </div>
      </div>
      <div className="grid w-full gap-4 p-6">
        <div className="mb-4 text-start text-2xl font-normal">
          <h1 className="pb-2 text-3xl font-bold">Opening Ceremony</h1>
          <p>Location: {ceremonyDetails.openingCeremonyLocation}</p>
          {/* <p>Time: {formatDate(openingCeremonyDate)}</p> */}
          <p>Nov 9, 10:00 AM</p>
        </div>
        <div className="text-start text-2xl font-normal">
          <h1 className="pb-2 text-3xl font-bold">Closing Ceremony</h1>
          <p>Location: {ceremonyDetails.closingCeremonyLocation}</p>
          {/* <p>Time: {formatDate(closingCeremonyDate)}</p> */}
          <p>Nov 10, 5:00 PM</p>
        </div>
      </div>
    </Card>
  );
}
