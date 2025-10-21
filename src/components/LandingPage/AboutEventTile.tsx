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
    <div className="group flex items-center gap-4 rounded-3xl bg-white/50 p-4 transition-all duration-300">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
        <Image
          src={iconSrc || "/placeholder.svg"}
          alt={`${iconName} icon`}
          width={28}
          height={28}
        />
      </div>
      <h2 className="text-xl font-bold  text-dark-grey md:text-2xl">
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
    <div className="flex w-full flex-col items-center bg-white py-10 md:py-20">
      <div className="z-100 mb-8 mt-4 flex w-4/5 flex-col rounded-3xl border-4 border-dark-pink bg-pastel-pink shadow-[15px_15px_0px_0px_dark-pink] xl:mb-12 xl:mt-8">
        <div className="relative rounded-t-3xl border-b-4 border-dark-pink bg-dark-pink">
          <div className="flex h-1/2 w-full items-center justify-center overflow-hidden rounded-t-3xl bg-dark-pink">
            <Image
              src={
                eventDetails.locationImage.fields.file?.url
                  ?.toString()
                  .replace("//", "https://") ?? ""
              }
              alt={eventDetails.locationName}
              sizes="100vw"
              height={0}
              width={0}
              priority
              className="size-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <div className="rounded-3xl bg-pastel-pink p-8 shadow-lg md:p-12">
          <div className="grid gap-6 md:grid-cols-2">
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
