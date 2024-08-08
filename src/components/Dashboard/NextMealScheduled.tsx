import Image from "next/image";
import Link from "next/link";

import CalendarIcon from "@/images/dashboard/Calendar.png";

import Card from "./Card";

export default function NextMealScheduled() {
  const href = "#";
  const mealTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const location = "ICT";
  return (
    <Card className="flex flex-row justify-start gap-8">
      <Link href={href}>
        <Image
          className="transition duration-300 hover:opacity-90"
          src={CalendarIcon}
          alt={"Participant Icon"}
        />
      </Link>
      <div className="flex flex-col gap-2 text-start text-2xl font-medium">
        <h1>
          Next Meal <br /> Scheduled at
        </h1>
        <div className="text-3xl font-bold italic text-zinc-800">
          {mealTime}
        </div>
        <h2>Location: {location}</h2>
      </div>
    </Card>
  );
}
