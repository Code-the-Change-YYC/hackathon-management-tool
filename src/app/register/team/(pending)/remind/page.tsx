import PurpleButton from "@/components/PurpleButton";

export default function page() {
  // TODO: Add a reminder to join a team in two days
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-3xl p-4 md:p-8">
      <div className="flex w-full flex-col justify-center rounded-3xl bg-white p-4 md:p-8">
        <div className=" pb-8 text-center text-4xl font-bold">
          {/* TODO: Update "two" to be dynamic */}
          We will remind you to join a team in two days!
        </div>
        <div className="p-4 text-center text-3xl font-bold">
          In the meantime, join the official Discord!
        </div>
        <div className="flex items-center justify-center p-2">
          <a
            target="_blank"
            rel="noreferrer"
            href={process.env.NEXT_PUBLIC_DISCORD_LINK}
          >
            <PurpleButton>Official Hackathon Discord</PurpleButton>
          </a>
        </div>
      </div>
      <div className="pt-8">
        <a href="/">
          <PurpleButton>Go Home</PurpleButton>
        </a>
      </div>
    </div>
  );
}
