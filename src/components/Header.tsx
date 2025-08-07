"use client";

import { signOut } from "aws-amplify/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { UserType } from "@/components/contexts/UserContext";
import { useUserDetails } from "@/components/contexts/UserDetailsContext";
import UserBasedNav from "./Dashboard/UserBasedNav";

export default function Header() {
  const user = useUser().currentUser;

  const userId = useUser().currentUser.username as string;

  const { data } = useQuery({
    initialData: {} as Schema["Team"]["type"],
    initialDataUpdatedAt: 0,
    queryKey: ["Team", userId],
    queryFn: async () => {
      const userResponse = await client.models.User.get({
        id: userId,
      });

      if (userResponse.errors) throw new Error(userResponse.errors[0].message);

      const userTeamId = userResponse.data?.teamId as string;

      if (userTeamId) {
        const teamResponse = await client.models.Team.get({
          id: userTeamId,
        });

        if (teamResponse.errors)
          throw new Error(teamResponse.errors[0].message);

        return teamResponse.data;
      } else {
        return {} as Schema["Team"]["type"];
      }
    },
    enabled: !!userId,
  });
  const router = useRouter();
  const handleLogout = () => {
    signOut();
    router.push("/");
  };
  return (
    <div className="flex h-[15dvh] w-dvw flex-row items-center justify-between bg-white px-8 text-awesomer-purple">
      <div className="flex w-48">
        {userId === "" ? (
          <div></div>
        ) : userDetails ? (
          <UserBasedNav />
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
            className="shadow-lg transition-transform hover:scale-125"
          />
        </Link>
      </div>

      <div className="flex w-48 justify-end">
        {user.completedRegistration && (
          <Link href="/participant/profile">
            <CgProfile size={60} />
          </Link>
        )}
        {user.username && (
          <button onClick={handleLogout} className="ml-4 font-semibold">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
