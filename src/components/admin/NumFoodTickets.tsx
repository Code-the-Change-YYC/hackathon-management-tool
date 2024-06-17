import Image from "next/image";
import Link from "next/link";

import Card from "./Card";

export default function NumFoodTickets() {
  const numFoodTickets = 200;
  const href = "#";
  return (
    <Card>
      <div className="flex items-center gap-4 ">
        <Link href={href}>
          <Image
            className="transition duration-300 hover:opacity-90"
            src={"/images/admin/TicketIcon.png"}
            width={100}
            height={100}
            alt={"Food Ticket Icon"}
          />
        </Link>
        <div className="">
          <Link href={href} className="z-10 text-xl font-medium">
            No. of Food Tickets
          </Link>
          <div className=" -z-10 select-none text-8xl italic text-zinc-800">
            {numFoodTickets}
          </div>
        </div>
      </div>
    </Card>
  );
}
