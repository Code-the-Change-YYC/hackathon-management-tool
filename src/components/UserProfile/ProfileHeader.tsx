"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { getUrl, list } from "aws-amplify/storage";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useUser } from "@/components/contexts/UserContext";

const CONTAINER_STYLES = "flex h-60 items-center justify-center bg-[#FF6B54]";
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
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  // console.log(user);

  // useEffect(() => {
  //   const getProfilePicture = async () => {
  //     // Get user ID from appropriate property
  //     const userId = user?.username;

  //     if (!userId) {
  //       console.log("No user ID found in user object", user);
  //       return;
  //     }

  //     console.log("User Found", user);

  //     try {
  //       // Try multiple common image filenames since we can't list the directory
  //       const possibleFilenames = [
  //         "profile.jpg",
  //         "profile.jpeg",
  //         "profile.png",
  //         "avatar.jpg",
  //         "avatar.png",
  //         "photo.jpg",
  //         "photo.png",
  //         "image.jpg",
  //         "image.png",
  //       ];

  //       // Try each possible filename
  //       for (const filename of possibleFilenames) {
  //         try {
  //           const profileImageKey = `private/${userId}/profilePicture/${filename}`;

  //           // Attempt to get the URL directly
  //           const { url } = await getUrl({
  //             key: profileImageKey,
  //             options: { accessLevel: "private" },
  //           });

  //           // If successful, set the URL and exit
  //           setProfileImageUrl(url.href);
  //           return;
  //         } catch (fileError) {
  //           // Continue to the next filename if this one doesn't work
  //           continue;
  //         }
  //       }

  //       // If we get here, none of the common filenames worked
  //       // We can still try the list approach as a last resort
  //       try {
  //         const result = await list({
  //           path: `private/${userId}/profilePicture/`,
  //           options: { accessLevel: "private" },
  //         });

  //         if (result.items && result.items.length > 0) {
  //           // Sort files by last modified date (newest first)
  //           const sortedFiles = result.items.sort((a, b) => {
  //             return (
  //               (b.lastModified?.getTime() || 0) -
  //               (a.lastModified?.getTime() || 0)
  //             );
  //           });

  //           const latestFile = sortedFiles[0];

  //           // Get the file URL
  //           const { url } = await getUrl({
  //             key: latestFile.path,
  //             options: { accessLevel: "private" },
  //           });

  //           setProfileImageUrl(url.href);
  //         }
  //       } catch (listError) {
  //         // ListBucket permission is likely missing - silently fall back to default
  //         console.log("List operation failed, using default profile image");
  //       }
  //     } catch (error) {
  //       // Just silently fall back to default image
  //       console.log("Using default profile image due to access restrictions");
  //     }
  //   };

  //   if (user) {
  //     getProfilePicture();
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const session = await fetchAuthSession();
        const identityId = session.identityId;

        // Step 1: List all files in the user's folder
        const { items } = await list({
          path: `public/${identityId}/`,
        });

        if (items.length > 0) {
          // Step 2: Get the key of the first file
          const firstFileKey = items[0].path;

          // Step 3: Get the public URL of that file
          const { url } = await getUrl({
            path: firstFileKey || "",
          });

          // Step 4: Set the URL as the profile picture
          setProfileImageUrl(url.href);
        } else {
          console.warn("No profile picture found for this user.");
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <div className={CONTAINER_STYLES}>
      <div className={PROFILE_CONTAINER}>
        <Image
          src={profileImageUrl || "/images/userProfile/profile.png"} //temporary profile image
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
