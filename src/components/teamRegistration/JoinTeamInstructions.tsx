import RedirectIcon from "../RedirectIcon";

export default function JoinTeamInstructions() {
  return (
    <ol className="flex list-inside list-decimal flex-col gap-4 px-6 text-lg font-medium">
      <li>
        Join the{" "}
        <span className="font-bold">
          <a
            className="mx-0.5 inline-flex flex-row items-center gap-1 text-awesome-purple hover:text-awesomer-purple"
            target="_blank"
            rel="noreferrer"
            href={process.env.NEXT_PUBLIC_DISCORD_LINK}
          >
            {" "}
            Code the Change YYC Discord{" "}
            <RedirectIcon className="h-4 w-4 text-awesome-purple hover:text-awesomer-purple" />
          </a>
        </span>{" "}
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
        <span className="font-bold"> 4-digit Team ID </span>
        following registration.
      </li>
      <li>
        Next, provide this
        <span className="font-bold"> 4-digit Team ID </span>
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
