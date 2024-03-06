import Image from "next/image";
import type { ReactNode } from "react";

const EVENT_DETAILS_SECTION_STYLES = "flex flex-col items-center bg-white";
const EVENT_DETAILS_CONTENT_STYLES =
  "bg-pastel-pink border-4 border-dark-pink rounded-3xl mb-20 mt-12 md:flex md:justify-center md:max-w-[1100px] md:shadow-[15px_15px_0px_0px_#FF4D6F]";
const EVENT_IMAGE_CONTAINER_STYLES =
  "bg-blackish rounded-t-20 border-b-4 border-dark-pink w-72 h-64 md:rounded-tr-none md:rounded-l-2xl md:border-b-0 md:border-r-4 md:h-[370px] md:w-[40vw]";
const EVENT_IMAGE_STYLES = "w-full h-full object-cover";
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

const eventDetails = {
  eventDate: 1731258000,
  eventLocation: "University of Calgary",
  eventImg: "/image",
  eventPrizeAmount: 17000,
};

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

const AboutEventTile = () => {
  const eventDate = new Date(eventDetails.eventDate * 1000);
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
            src={eventDetails.eventImg}
            alt={eventDetails.eventLocation}
            width={100}
            height={100}
          />
        </div>
        <div className={EVENT_DETAILS_CONTAINER_STYLES}>
          <div>
            <EventDetail iconSrc={icons.date} iconName="date">
              {formattedDate}
            </EventDetail>
            <EventDetail iconSrc={icons.location} iconName="location">
              {eventDetails.eventLocation}
            </EventDetail>
            <EventDetail iconSrc={icons.heart} iconName="heart">
              Public
            </EventDetail>
            <EventDetail iconSrc={icons.diamond} iconName="diamond">
              ${eventDetails.eventPrizeAmount}
            </EventDetail>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEventTile;
