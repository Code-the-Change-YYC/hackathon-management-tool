import Image from "next/image";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";

import TicketIcon from "@/images/dashboard/TicketIcon.png";

import Card from "./Card";

export default function GoToFoodTicket() {
  const href = "#";
  return (
    <Card className="flex flex-row  justify-around gap-2">
      <Link href={href}>
        <Image
          className="transition duration-300 hover:opacity-90"
          src={TicketIcon}
          alt={"Food Ticket Icon"}
        />
      </Link>
      <div className=" text-start">
        <div className=" text-xl font-medium">Go To My</div>
        <h2 className="italic"> Food Ticket</h2>
      </div>
      <FaCircleArrowRight size={48} color="grey" />
    </Card>
  );
}
