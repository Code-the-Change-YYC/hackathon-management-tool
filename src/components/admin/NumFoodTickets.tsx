import Image from "next/image";

import Card from "./Card";

export default function NumFoodTickets() {
  const numFoodTickets = 200;
  return (
    <Card>
      <div className="flex items-center gap-4 ">
        <Image
          src={"/images/admin/TicketIcon.png"}
          width={100}
          height={100}
          alt={"Food Ticket Icon"}
        />
        <div className="">
          <div className="text-xl">No. of Food Tickets</div>
          <div className="text-8xl italic text-zinc-800">{numFoodTickets}</div>
        </div>
      </div>
    </Card>
  );
}
