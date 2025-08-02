import Image from "next/image";
import Link from "next/link";
import client from "../_Amplify/AmplifyBackendClient";
import Card from "./Card";

export default async function TotalParticipants() {
  const users = await client.models.User.list({
    limit: 1000,
  });
  // TODO: "user.role should be an enum, not a string."
  const participants = users.data.filter((user) => user.role === "Participant");
  const numParticipants = participants.length;
  const href = "/admin/users";
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
      <div className="text-8xl italic text-dark-grey">{numParticipants}</div>
    </Card>
  );
}
