"use client";

import Link from "next/link";
import { useUserDetails } from "@/components/contexts/UserDetailsContext";

const LINK_STYLES =
  " cursor-pointer opacity-95 pb-4 flex justify-start font-bold md:justify-center";
export default function HeroCallToAction() {
  const { userDetails } = useUserDetails();

  const userId = userDetails?.id || "";

  return (
    <>
      <div className={LINK_STYLES}>
        <a href={userId !== "" ? "/participant/profile" : "/register"}>
          <div className=" text-md rounded-2xl border-4 border-white bg-awesomer-purple px-8 py-4 text-white  hover:opacity-70 md:mb-0 md:px-4">
            {userId ? "Go to Profile" : "Join Hackathon"}
          </div>
        </a>
      </div>
      {userId === "" && (
        <div className={" flex gap-1 pb-4 font-bold opacity-95 "}>
          {"Already registered? "}
          <Link href="/login" className="text-awesomer-purple hover:opacity-70">
            {" Sign in"}
          </Link>
        </div>
      )}
    </>
  );
}
