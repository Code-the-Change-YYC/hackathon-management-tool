import Image from "next/image";
import { ReactNode } from "react";

const eventImageContainerStyles =
  "bg-blackish w-[290px] h-[250px] mt-[50px] border-[5px] border-dark-pink rounded-t-[30px] border-b-0";
const eventImageStyles = "w-full h-full object-cover";
const eventDetailsContainerStyles =
  "flex items-center w-[290px] h-[370px] bg-pastel-pink border-[5px] border-dark-pink rounded-b-[30px] mb-[70px]";
const eventDetailStyles = "flex items-center ml-[40px]";
const eventDetailTitleStyles =
  "text-lg text-blackish font-extrabold leading-[1.2]";
const iconContainerStyles = "bg-white rounded-[12px] p-[5px] m-[15px]";

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
  eventImg: "image",
  eventPrizeAmount: 17000,
};

const EventDetail = ({ iconSrc, iconName, children }: EventDetailProps) => (
  <div className={eventDetailStyles}>
    <div className={iconContainerStyles}>
      <Image src={iconSrc} alt={`${iconName} icon`} width={35} height={35} />
    </div>
    <h2 className={eventDetailTitleStyles}>{children}</h2>
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
    <div className="flex flex-col items-center bg-white">
      <div className={eventImageContainerStyles}>
        <img className={eventImageStyles} src={eventDetails.eventImg} alt="" />
      </div>
      <div className={eventDetailsContainerStyles}>
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
  );
};

export default AboutEventTile;
