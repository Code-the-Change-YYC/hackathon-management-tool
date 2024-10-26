import Image from "next/image";
import type { ReactNode } from "react";

import { fetchContent } from "@/app/actions";
import type { HackathonDetails } from "@/app/contentfulTypes";

const EVENT_DETAILS_SECTION_STYLES = "flex flex-col items-center bg-white";
const EVENT_DETAILS_CONTENT_STYLES =
  "bg-pastel-pink border-4 border-dark-pink rounded-3xl my-4 lg:my-8 flex md:flex md:justify-center md:max-w-[1100px] md:shadow-[15px_15px_0px_0px_#FF4D6F]";
const EVENT_IMAGE_CONTAINER_STYLES =
  "bg-blackish rounded-t-20 border-b-4 border-dark-pink w-72 h-64 md:rounded-tr-none md:rounded-l-3xl md:border-b-0 md:border-r-4 md:h-[370px] md:w-[40vw]";
const EVENT_IMAGE_STYLES =
  "w-full h-full object-cover md:rounded-l-2xl md:rounded-tl-2xl md:rounded-t-none rounded-t-2xl";
const EVENT_DETAILS_CONTAINER_STYLES =
  "flex items-center w-72 h-[370px] rounded-b-20 md:w-[50vw] md:rounded-bl-none md:rounded-r-2xl";
const EVENT_DETAIL_STYLES = "flex items-center ml-10";
const EVENT_DETAIL_TITLE_STYLES =
  "text-lg text-blackish font-extrabold leading-tight";
const ICON_CONTAINER_STYLES = "bg-white rounded-xl p-1 m-4";

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

const EventDetail = (props: EventDetailProps) => {
  const { iconSrc, iconName, children } = props;

  return (
    <div className={EVENT_DETAIL_STYLES}>
      <div className={ICON_CONTAINER_STYLES}>
        <Image src={iconSrc} alt={`${iconName} icon`} width={35} height={35} />
      </div>
      <h2 className={EVENT_DETAIL_TITLE_STYLES}>{children}</h2>
    </div>
  );
};

export default async function AboutEventTile() {
  const data = (await fetchContent("hackathonDetails")) as HackathonDetails[];
  const eventDetails = data[0].fields;
  const eventDate = new Date(eventDetails.eventDate);
  const formattedDate = eventDate.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={EVENT_DETAILS_SECTION_STYLES}>
      <div className={EVENT_DETAILS_CONTENT_STYLES}>
        <div className={EVENT_IMAGE_CONTAINER_STYLES}>
          <Image
            className={EVENT_IMAGE_STYLES}
            src={
              eventDetails.locationImage.fields.file?.url
                ?.toString()
                .replace("//", "https://") ?? ""
            }
            alt={eventDetails.locationName}
            width={500}
            height={500}
          />
        </div>
        <div className={EVENT_DETAILS_CONTAINER_STYLES}>
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
