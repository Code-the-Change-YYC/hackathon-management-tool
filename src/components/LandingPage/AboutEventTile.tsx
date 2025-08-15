import Image from "next/image";
import type { ReactNode } from "react";
import { fetchContent } from "@/app/actions";

const icons = {
  date: "/svgs/aboutEventTile/date_icon.svg",
  location: "/svgs/aboutEventTile/location_icon.svg",
  heart: "/svgs/aboutEventTile/heart_icon.svg",
  diamond: "/svgs/aboutEventTile/diamond_icon.svg",
};

interface EventDetailProps {
  iconSrc: string;
  iconName: string;
  children: ReactNode;
}

const EventDetail = ({ iconSrc, iconName, children }: EventDetailProps) => {
  return (
    <div className="ml-10 flex items-center">
      <div className="m-4 rounded-xl bg-white p-1">
        <Image
          src={iconSrc || "/placeholder.svg"}
          alt={`${iconName} icon`}
          width={35}
          height={35}
        />
      </div>
      <h2 className="text-lg font-extrabold leading-tight text-dark-grey">
        {children}
      </h2>
    </div>
  );
};

export default async function AboutEventTile() {
  const data = await fetchContent("hackathonDetails");
  const eventDetails = data[0].fields;
  const eventDate = new Date(eventDetails.eventDate);
  const formattedDate = eventDate.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="z-100 mb-8 mt-4 flex w-4/5 flex-row rounded-3xl border-4 border-dark-pink bg-pastel-pink shadow-[15px_15px_0px_0px_dark-pink] xl:mb-12 xl:mt-8">
        <div className="relative flex aspect-[16/9] w-full max-w-xl items-center justify-center overflow-hidden rounded-l-2xl bg-dark-grey">
          <Image
            src={
              eventDetails.locationImage.fields.file?.url
                ?.toString()
                .replace("//", "https://") ?? ""
            }
            alt={eventDetails.locationName}
            fill
            sizes="(max-width: 768px) 100vw, 345px"
            priority
          />
        </div>
        <div className="flex w-full items-center rounded-b-20 md:rounded-r-2xl md:rounded-bl-none xl:w-1/2">
          <div>
            <EventDetail iconSrc={icons.date} iconName="date">
              {formattedDate}
            </EventDetail>
            <EventDetail iconSrc={icons.location} iconName="location">
              {eventDetails.locationName}
            </EventDetail>
            <EventDetail iconSrc={icons.heart} iconName="heart">
              Public
            </EventDetail>
            <EventDetail iconSrc={icons.diamond} iconName="diamond">
              ${eventDetails.prizeAmount}
            </EventDetail>
          </div>
        </div>
      </div>
    </div>
  );
}
