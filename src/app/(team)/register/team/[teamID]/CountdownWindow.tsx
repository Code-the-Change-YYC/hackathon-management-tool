"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CountdownTimer from "@/components/LandingPage/CountdownTimer";

export default function CountdownWindow({
  children,
}: {
  children?: React.ReactNode;
}) {
  const formatDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString();
  };
  const eventDate = 1731394799; //UNIX Time stamp: Nov 10, 2024
  const eventDateFormatted = formatDate(eventDate);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hackathonTime, setHackathonTime] = useState(false);
  useEffect(() => {
    const target = new Date(eventDateFormatted);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setHackathonTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const HackathonClock = () => {
    return (
      <>
        <h2 className="text-3xl font-bold text-black">
          Hack the Change 2024 begins...
        </h2>
        <div className="flex flex-row gap-4">
          <CountdownTimer name="Days" value={days} />
          <CountdownTimer name="Hours" value={hours} />
          <CountdownTimer name="Minutes" value={minutes} />
          <CountdownTimer name="Seconds" value={seconds} />
        </div>
        <div className="flex flex-row items-end gap-4">
          <CountdownTimer value={"Nov"} />
          <CountdownTimer value={11} />
          <div className=" text-4xl text-awesome-purple">to</div>
          <CountdownTimer value={12} />
        </div>
      </>
    );
  };
  const HackathonStart = () => (
    <h1
      className="flex-wrap text-4xl font-black text-awesomer-purple drop-shadow-lg md:text-center md:text-5xl"
      style={{
        textShadow: `
                -2px -2px 0 #fff, 
                2px -2px 0 #fff, 
                -2px 2px 0 #fff, 
                2px 2px 0 #fff,
                -2px -2px 0 #fff,
                2px -2px 0 #fff,
                -2px 2px 0 #fff,
                2px 2px 0 #fff
              `,
      }}
    >
      Hack the Change 2024
      <br />
      has begun!
    </h1>
  );

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
      <div className="flex flex-col items-center gap-4 rounded-b-3xl bg-white py-12 text-awesomer-purple">
        <h1 className="text-5xl font-extrabold">Thank you.</h1>
        <h1 className="text-3xl font-medium">Your registration is complete!</h1>
        {hackathonTime ? <HackathonStart /> : <HackathonClock />}
        <p className="text-lg font-semibold text-black">
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
