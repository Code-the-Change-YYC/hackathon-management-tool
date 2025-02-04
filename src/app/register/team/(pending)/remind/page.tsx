import PurpleButton from "@/components/PurpleButton";

export default function page() {
  // TODO: Add a reminder to join a team in two days
  return (
    <div className="flex w-full flex-col justify-center rounded-3xl bg-white p-4 md:p-8">
      <div className=" pb-8 text-center text-3xl font-bold">
        {/* TODO: Update "two" to be dynamic */}
        We will remind you to join a team in two days!
      </div>
      <div className=" py-16 text-center text-3xl font-bold">
        In the meantime, join the official Discord!
      </div>
      <div className="flex items-center justify-center">
        <a
          target="_blank"
          rel="noreferrer"
          href={
            "https://discord.com/channels/1098088070760382568/1098088071418880071"
          }
        >
          <PurpleButton>Official Hackathon Discord</PurpleButton>
        </a>
      </div>
    </div>
  );
}
