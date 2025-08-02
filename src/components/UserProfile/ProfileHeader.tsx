"use client";

import Image from "next/image";
import { useUser } from "@/components/contexts/UserContext";

const CONTAINER_STYLES = "flex h-60 items-center justify-center bg-grapefruit";
const PROFILE_CONTAINER =
  "absolute top-44 flex flex-row md:left-20 md:top-52 md:z-10 ";
const PROFILE_IMG =
  "align-start mr-2 rounded-full border-4 border-white md:mr-10 md:w-36 lg:-mt-4 lg:ml-4 lg:w-60 lg:border-8";

const LEFT_SQUIGGLE_STYLES =
  "absolute left-0 mr-1 mt-2 md:h-56 md:w-52 lg:mb-8 lg:block lg:h-1/3 lg:w-2/5";

const RIGHT_SQUIGGLE_STYLES =
  "absolute right-0 ml-1 mt-2 md:right-0 md:h-56 md:w-60  lg:right-20 lg:block lg:size-1/3";

export default function ProfileHeader() {
  const user = useUser().currentUser;

  // console.log(user);

  return (
    <div className={CONTAINER_STYLES}>
      <div className={PROFILE_CONTAINER}>
        <Image
          src="/images/userProfile/profile.png" //temporary profile image
          alt="Profile Image"
          width={120}
          height={120}
          className={PROFILE_IMG}
        />
      </div>
      <div className="mt-40 flex flex-row items-center md:mt-0">
        <Image
          src="/images/userProfile/Squiggly_Left.svg"
          alt="Left Squiggly SVG"
          width={105}
          height={60}
          className={LEFT_SQUIGGLE_STYLES}
        />
        <h1 className="flex text-center text-xl font-extrabold text-white md:text-4xl">
          {user.username ? (
            <>
              <span>Hello,&nbsp;</span>
              <span className="italic">
                {user?.firstName} {user.lastName}
              </span>
            </>
          ) : (
            "Loading..."
          )}
        </h1>
        <Image
          src="/images/userProfile/Squiggly_Right.svg"
          alt="Right Squiggly SVG"
          width={105}
          height={60}
          className={RIGHT_SQUIGGLE_STYLES}
        />
      </div>
    </div>
  );
}
