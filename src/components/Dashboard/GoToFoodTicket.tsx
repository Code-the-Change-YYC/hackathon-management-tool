import Image from "next/image";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";
import ParticipantTicketIcon from "@/images/dashboard/ParticipantTicketIcon.png";
import Card from "./Card";

const href = "/participant/profile/food-ticket";
export default function GoToFoodTicket() {
  return (
    <Card className="flex h-full flex-row justify-start gap-8">
      <Link href="/participant/profile/food-ticket">
        <Image
          className="transition duration-300 hover:opacity-90"
          src={ParticipantTicketIcon}
          alt={"Food Ticket Icon"}
        />
      </Link>
      <div className=" text-start">
        <div className=" text-xl font-medium">Go To My</div>
        <h2 className="italic"> Food Ticket</h2>
      </div>
      <Link
        href="/participant/profile/food-ticket"
        className="transition duration-300 hover:opacity-90"
      >
        <FaCircleArrowRight size={48} color="grey" />
      </Link>
    </Card>
  );
}
