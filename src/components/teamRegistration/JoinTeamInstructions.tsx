import Link from "next/link";

export default function JoinTeamInstructions() {
  return (
    <ol className="flex list-inside list-decimal flex-col gap-4 px-6 text-lg font-medium">
      <li>
        Join the
        <Link href="https://discord.com/" target="_blank">
          <span className=" font-bold">
            <a
              className="hover:text-awesomer-purple"
              target="_blank"
              rel="noreferrer"
              href={
                "https://discord.com/channels/1098088070760382568/1098088071418880071"
              }
            >
              {" "}
              Code the Change YYC Discord{" "}
            </a>
          </span>
        </Link>
        and navigate to the
        <span className="font-bold"> #looking-for-a-team </span> channel.
      </li>
      <li>
        Reach out to an
        <span className="font-bold"> existing team </span>or
        <span className="font-bold"> form a new team.</span>
      </li>
      <li>
        After forming a team, assign
        <span className="font-bold"> ONE </span>
        member to <span className="font-bold"> “Register New Team” </span>
        using your Team Name. They will receive a unique
        <span className="font-bold"> 6-digit Team ID </span>
        following registration.
      </li>
      <li>
        Next, provide this
        <span className="font-bold"> 6-digit Team ID </span>
        to all team members.
      </li>
      <li>
        <span className="font-bold"> EACH </span>
        team member
        <span className="font-bold"> must </span>
        navigate to
        <span className="font-bold"> “Join Existing Team” </span>
        to submit this ID to officially join the group.
      </li>
    </ol>
  );
}
