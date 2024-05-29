"use client";

import Image from "next/image";
import Link from "next/link";

import { UserType, useUser } from "@/components/contexts/UserContext";

const headerContainerStyles =
  "flex flex-row items-center justify-between text-awesomer-purple h-36 bg-white px-8";

export default function Header() {
  const user = useUser().currentUser;

  return (
    <div className={headerContainerStyles}>
      <div className="flex w-48 font-semibold">
        {user.type === UserType.Participant ? (
          <>
            {user.completedProfile ? (
              <>
                {user.teamId ? (
                  <Link href="/participant/register">Join a Team</Link>
                ) : (
                  <Link href="/participant/profile/team-details">
                    View Team
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login">Join Hackathon</Link>
            )}
          </>
        ) : user.type === UserType.Admin ? (
          <Link href="/admin/teams">Admin Dashboard</Link>
        ) : (
          <Link href="/">Judge Dashboard</Link>
        )}
      </div>

      <div className="flex w-48 justify-center">
        <Link href="/">
          <Image
            src="/CTCLogo.svg"
            alt="Awesome Logo"
            width={70}
            height={70}
            className="shadow-lg"
          />
        </Link>
      </div>

      <div className="flex w-48 justify-end">
        {user.completedProfile && (
          <Link href="/participant/profile">
            <Image
              src={
                // This is temporary. replace with user profile image
                "/MissingProfile.png"
              }
              alt={"profile image"}
              width={70}
              height={70}
              className="rounded-full"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
