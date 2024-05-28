"use client";

import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

const check_mark_icon = "/svgs/checkin/check_mark.svg";
const cross_icon = "/svgs/checkin/circle_cross.svg";

const CHECKIN_STATUS_TILE_STLYES =
  "my-20 flex w-4/5 max-w-[1000px] flex-col items-center rounded-xl border-2 border-dark-pink bg-white p-10 shadow-[15px_15px_0px_0px_#FF4D6F]";
const CHECKIN_STATUS_HEADER_STYLES = "mb-2 text-2xl font-bold text-dark-pink";
const CHECKIN_STATUS_TEXT_STYLES =
  "mb-6 max-w-[450px] text-center text-lg text-black";
const CHECKIN_STATUS_BUTTON_STYLES =
  "rounded-xl bg-dark-pink p-4 font-bold hover:bg-pastel-pink";

const fetchCheckInStatus = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "success";
};

const CheckInPage = () => {
  const { status } = useQuery({
    queryKey: ["checkInStatus"],
    queryFn: fetchCheckInStatus,
  });

  return (
    <div className="flex h-[600px] w-full items-center justify-center">
      {status === "pending" && (
        <p className="my-20 text-3xl font-bold text-dark-pink">
          Checking you in...
        </p>
      )}
      {status === "error" && (
        <div className={CHECKIN_STATUS_TILE_STLYES}>
          <Image
            src={cross_icon}
            height={100}
            width={100}
            alt="X icon"
            className="mb-2"
          />
          <h1 className={CHECKIN_STATUS_HEADER_STYLES}>Failed to Check-in</h1>
          <p className={CHECKIN_STATUS_TEXT_STYLES}>
            We apologize for the inconvenience. Please try checking in again.
          </p>
          <Link href="/" className={CHECKIN_STATUS_BUTTON_STYLES}>
            Go To Home
          </Link>
        </div>
      )}
      {status === "success" && (
        <div className={CHECKIN_STATUS_TILE_STLYES}>
          <Image
            src={check_mark_icon}
            height={80}
            width={80}
            alt="Check mark icon"
            className="mb-4"
          />
          <h1 className={CHECKIN_STATUS_HEADER_STYLES}>
            You&apos;re Checked In!
          </h1>
          <p className={CHECKIN_STATUS_TEXT_STYLES}>
            Thanks for checking in to Hack the Change 2024! Click the button
            below to return to your profile.
          </p>
          <Link
            href="/participant/profile"
            className={CHECKIN_STATUS_BUTTON_STYLES}
          >
            Go To Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckInPage;
