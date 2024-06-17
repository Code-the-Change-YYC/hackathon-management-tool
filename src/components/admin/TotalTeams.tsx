import Image from "next/image";
import Link from "next/link";

import Card from "./Card";

export default function TotalTeams() {
  const numTeams = 50;
  const href = "#";
  return (
    <Card>
      <Link href={href}>
        <Image
          className="transition duration-300 hover:opacity-90"
          src={"/images/admin/TeamIcon.png"}
          width={100}
          height={100}
          alt={"Teams Icon"}
        />
      </Link>
      <Link href={href} className=" z-10 text-xl font-medium">
        Total Teams
      </Link>
      <div className=" text-8xl italic text-zinc-800">{numTeams}</div>
    </Card>
  );
}
