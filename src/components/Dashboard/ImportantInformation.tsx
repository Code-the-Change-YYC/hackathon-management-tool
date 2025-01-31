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
    <Card className="flex flex-col items-start gap-4">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Image src={ImportantInfoIcon} alt={"Important Info Icon"} />
        <div className="text-start font-medium">
          Important <br /> Information
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col gap-4">
        {/* Ceremony Details */}
        <div className="flex w-full flex-col gap-8 sm:flex-row">
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

        {/* Map Section */}
        <div className="map-container mx-auto w-full max-w-3xl p-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5013.071625159322!2d-114.13297702336814!3d51.08011837171925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f0eeb318a4f%3A0xa0dc1a9954a92366!2sICT%20Building!5e0!3m2!1sen!2sca!4v1736727221478!5m2!1sen!2sca"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          ></iframe>
        </div>
      </div>
    </Card>
  );
}
