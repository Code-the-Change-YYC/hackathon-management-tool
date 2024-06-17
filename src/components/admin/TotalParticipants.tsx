import Image from "next/image";

import Card from "./Card";

export default function TotalParticipants() {
  const numParticipants = 150;
  return (
    <Card>
      <Image
        src={"/images/admin/ParticipantIcon.png"}
        width={100}
        height={100}
        alt={"Participant Icon"}
      />
      <div className="text-xl">Total Participants </div>
      <div className="text-8xl italic text-zinc-800">{numParticipants}</div>
    </Card>
  );
}
