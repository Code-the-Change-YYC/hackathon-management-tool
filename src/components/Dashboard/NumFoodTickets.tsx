import Image from "next/image";
import Link from "next/link";

import TicketIcon from "@/images/dashboard/TicketIcon.png";

import client from "../_Amplify/AmplifyBackendClient";
import Card from "./Card";

export default async function NumFoodTickets() {
  const href = "/admin/create-food-event";
  const foodTickets = await client.models.UserFoodEventAttendance.list();
  const numFoodTickets = foodTickets.data.length;
  return (
    <Card>
      <div className="flex items-center gap-4 ">
        <Link href={href}>
          <Image
            className="transition duration-300 hover:opacity-90"
            src={TicketIcon}
            alt={"Food Ticket Icon"}
          />
        </Link>
        <div className="">
          <Link href={href} className="z-10 text-xl font-medium">
            No. of Food Tickets
          </Link>
          <div className=" -z-10 select-none text-8xl italic text-dark-grey">
            {numFoodTickets}
          </div>
        </div>
      </div>
    </Card>
  );
}
