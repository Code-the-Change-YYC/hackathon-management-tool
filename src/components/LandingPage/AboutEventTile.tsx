import Image from "next/image";
import type { ReactNode } from "react";

const EVENT_DETAILS_SECTION_STYLES = "flex flex-col items-center bg-white";
const EVENT_DETAILS_CONTENT_STYLES =
  "bg-pastel-pink border-[5px] border-dark-pink rounded-[25px] mb-[80px] mt-[50px] md:flex md:justify-center md:max-w-[1100px] md:shadow-[15px_15px_0px_0px_#FF4D6F]";
const EVENT_IMAGE_CONTAINER_STYLES =
  "bg-blackish rounded-t-[20px] border-b-[5px] border-dark-pink w-[290px] h-[250px] md:rounded-tr-none md:rounded-l-[20px] md:border-b-0 md:border-r-[5px] md:h-[370px] md:w-[40vw]";
const EVENT_IMAGE_STYLES = "w-full h-full object-cover";
const EVENT_DETAILS_CONTAINER_STYLES =
  "flex items-center w-[290px] h-[370px] rounded-b-[20px] md:w-[50vw] md:rounded-bl-none md:rounded-r-[20px]";
const EVENT_DETAIL_STYLES = "flex items-center ml-[40px]";
const EVENT_DETAIL_TITLE_STYLES =
  "text-lg text-blackish font-extrabold leading-[1.2]";
const ICON_CONTAINER_STYLES = "bg-white rounded-[12px] p-[5px] m-[15px]";

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

const EventDetail = ({ iconSrc, iconName, children }: EventDetailProps) => (
  <div className={EVENT_DETAIL_STYLES}>
    <div className={ICON_CONTAINER_STYLES}>
      <Image src={iconSrc} alt={`${iconName} icon`} width={35} height={35} />
    </div>
    <h2 className={EVENT_DETAIL_TITLE_STYLES}>{children}</h2>
  </div>
);

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
