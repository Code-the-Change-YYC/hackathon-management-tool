import Image from "next/image";
import Link from "next/link";
import HackathonClock from "../HackathonClock";

export default function CountdownWindow({
  hackathonInformation,
  children,
}: {
  hackathonInformation: { eventName: string; eventDate: Date };
  children?: React.ReactNode;
}) {
  const { eventName, eventDate } = hackathonInformation;

  return (
    <>
      <div className="w-full rounded-t-3xl bg-awesome-purple p-4">
        <Image
          className=" cursor-pointer"
          src={"/svgs/heroSection/window_control_buttons.svg"}
          alt="check mark icon"
          width={50}
          height={50}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-2 rounded-b-3xl bg-white py-12 text-center text-awesomer-purple sm:gap-4">
        <h1 className="text-5xl font-extrabold">Thank you.</h1>
        <h1 className="text-3xl font-medium">Your registration is complete!</h1>
        <HackathonClock eventDate={eventDate} eventName={eventName} />
        <p className="px-4 text-center text-lg font-semibold text-black">
          Join us for the two-day for-charity hackathon hosted on November 11th
          to 12th by{" "}
          <Link
            className=" font-bold text-awesomer-purple underline"
            target="_blank"
            href={"https://www.codethechangeyyc.ca/"}
          >
            Code the Change YYC.
          </Link>
        </p>
        {children}
      </div>
    </>
  );
}
