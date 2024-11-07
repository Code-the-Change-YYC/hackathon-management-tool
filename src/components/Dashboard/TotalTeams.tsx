import Image from "next/image";
import Link from "next/link";

import client from "../_Amplify/AmplifyBackendClient";
import Card from "./Card";

export default async function TotalTeams() {
  const teams = await client.models.Team.list({
    limit: 1000,
  });
  const numTeams = teams.data.length;
  const href = "/admin/teams";
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
