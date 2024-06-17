import Image from "next/image";
import Link from "next/link";

import Card from "./Card";

export default function TotalParticipants() {
  const numParticipants = 150;
  const href = "#  ";
  return (
    <Card>
      <Link href={href}>
        <Image
          className="transition duration-300 hover:opacity-90"
          src={"/images/admin/ParticipantIcon.png"}
          width={100}
          height={100}
          alt={"Participant Icon"}
        />
      </Link>
      <Link href={href} className="z-10 text-xl font-medium">
        Total Participants
      </Link>
      <div className="text-8xl italic text-zinc-800">{numParticipants}</div>
    </Card>
  );
}
