import Image from "next/image";

import Card from "./Card";

export default function TotalTeams() {
  const numTeams = 50;
  return (
    <Card>
      <Image
        src={"/images/admin/TeamIcon.png"}
        width={100}
        height={100}
        alt={"Teams Icon"}
      />
      <h1 className=" text-xl">Total Teams</h1>
      <div className=" text-8xl italic text-zinc-800">{numTeams}</div>
    </Card>
  );
}
