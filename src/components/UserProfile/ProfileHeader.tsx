"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { getUrl } from "aws-amplify/storage";
import Image from "next/image";

import { useUser } from "@/components/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

export default function ProfileHeader() {
  const user = useUser().currentUser;

  const fetchProfileImage = async (): Promise<string | null> => {
    const session = await fetchAuthSession();
    const identityId = session.identityId;
    try {
      const { url } = await getUrl({
        path: `public/${identityId}.png`,
      });
      return url.href;
    } catch (err) {
      console.error(`Failed to fetch image:`, err);
    }

    return null; // No image found
  };

  const { data: profileImageUrl, isLoading } = useQuery({
    queryKey: ["profile-image"],
    queryFn: fetchProfileImage,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-awesome-purple">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className={"flex h-60 items-center justify-center bg-[#FF6B54]"}>
      <div
        className={
          "absolute top-44 flex flex-row md:left-20 md:top-52 md:z-10 "
        }
      >
        <Image
          src={profileImageUrl || "/images/userProfile/profile.png"} //temporary profile image
          alt="Profile Image"
          width={120}
          height={60}
          className={
            "mr-2 size-32 rounded-full border-4 border-white md:mr-10 md:w-36 lg:-mt-4 lg:ml-4 lg:w-60 lg:border-8"
          }
        />
      </div>
      <div className="mt-40 flex flex-row items-center md:mt-0">
        <Image
          src="/images/userProfile/Squiggly_Left.svg"
          alt="Left Squiggly SVG"
          width={105}
          height={60}
          className={
            "absolute left-0 mr-1 mt-2 md:h-56 md:w-52 lg:mb-8 lg:block lg:h-1/3 lg:w-2/5"
          }
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
          className={
            "absolute right-0 ml-1 mt-2 md:right-0 md:h-56 md:w-60  lg:right-20 lg:block lg:size-1/3"
          }
        />
      </div>
    </div>
  );
}
