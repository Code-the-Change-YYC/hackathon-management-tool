import Image from "next/image";
import Link from "next/link";

const BUTTON_STYLES =
  "bg-awesomer-purple w-full py-2 hover:opacity-90 transition duration-300 font-medium text-xl rounded-full border-4 border-white shadow-md md:w-[300px]";
export default function page() {
  return (
    <div className="flex w-full flex-col justify-center gap-6 rounded-3xl bg-white p-4 md:p-8">
      <div className="text-3xl font-semibold">
        <h1>Next steps...</h1>
        <div className="size-fit">
          <h1>Create your team!</h1>
          <div className="relative h-4">
            <Image src="/images/register/group_58.png" alt="" fill />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-semibold">Looking for a team?</h1>
        <ol className="flex list-inside list-decimal flex-col gap-4 px-6 text-lg font-medium">
          <li>
            Join the
            <Link href="https://discord.com/" target="_blank">
              <span className=" font-bold"> Code the Change YYC Discord </span>
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
      </div>
      <div className=" flex items-center justify-center">
        <h2 className="max-w-lg text-center text-4xl font-bold">
          Ready to Register a new team or Join an existing team?
        </h2>
      </div>
      <div className="flex justify-between text-white">
        <button className={BUTTON_STYLES}>Remind me later</button>
        <button className={BUTTON_STYLES}>Yes!</button>
      </div>
    </div>
  );
}
