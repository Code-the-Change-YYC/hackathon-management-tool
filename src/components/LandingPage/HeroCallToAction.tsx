"use client";

import Link from "next/link";

import { useAuthenticator } from "@aws-amplify/ui-react";

const LINK_STYLES =
  " cursor-pointer opacity-95 pb-4 flex justify-start font-bold md:justify-center";
export default function HeroCallToAction() {
  const { authStatus } = useAuthenticator();
  return (
    <>
      <div className={LINK_STYLES}>
        <a
          href={
            authStatus === "authenticated"
              ? "/participant/profile"
              : "/register"
          }
        >
          <div className=" rounded-2xl border-4 border-white bg-awesomer-purple px-6 py-2 text-sm text-white  hover:opacity-70 md:mb-0 md:px-6">
            {authStatus === "authenticated"
              ? "Go to Profile"
              : "Join Hackathon"}
          </div>
        </a>
      </div>
      {authStatus !== "authenticated" && (
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
