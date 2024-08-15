"use client";

import { signOut } from "aws-amplify/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

import { UserType, useUser } from "@/components/contexts/UserContext";

const headerContainerStyles =
  "flex flex-row items-center justify-between text-awesomer-purple h-36 bg-white px-8";

export default function Header() {
  const user = useUser().currentUser;

  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className={headerContainerStyles}>
      <div className="flex w-48 font-semibold">
        {user.completedProfile ? (
          <>
            {user.type === UserType.Participant ? (
              <>
                {user.teamId ? (
                  <Link href="/participant/dashboard">Dashboard</Link>
                ) : (
                  <Link href="/register/team">Join a Team</Link>
                )}
              </>
            ) : user.type === UserType.Admin ? (
              <Link href="/admin/teams">Admin Dashboard</Link>
            ) : (
              <Link href="/judge/dashboard">Judge Dashboard</Link>
            )}
          </>
        ) : (
          <Link href="/login">Join Hackathon</Link>
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
          <>
            <Link href="/participant/profile">
              <CgProfile size={60} />
            </Link>
            <button onClick={handleLogout} className="ml-4 font-semibold">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
