"use client";

import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import ProfileLinks from "@/components/UserProfile/ProfileLinks";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileHeader />
      <div className="flex w-full flex-col bg-fuzzy-peach px-10 md:px-16 md:py-10 ">
        <ProfileLinks />
        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
