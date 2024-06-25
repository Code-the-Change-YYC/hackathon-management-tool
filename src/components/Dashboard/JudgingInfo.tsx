import Image from "next/image";
import Link from "next/link";

import JudgeIcon from "@/images/dashboard/JudgeIcon.png";

import Card from "./Card";

export default function JudgingInfo() {
  const href = "#";
  const teamName = "Team Name";
  const timeSlot = "10:00 AM - 10:05 AM";
  return (
    <Card className="flex-1 items-start justify-around gap-4">
      <div className="flex items-center gap-4">
        <Link href={href}>
          <Image
            className="transition duration-300 hover:opacity-90"
            src={JudgeIcon}
            alt={"Food Ticket Icon"}
          />
        </Link>
        <div className="text-start font-medium">
          <div>{`${teamName}'s `}</div>
          <div className="">Judging Information</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-start">
        <div className="font-medium">Time Slot </div>
        <div className="text-5xl italic text-neutral-800">{timeSlot}</div>
      </div>
      <Link
        href={href}
        className="rounded-full bg-rose-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:opacity-90"
      >
        Zoom Link
      </Link>
    </Card>
  );
}
