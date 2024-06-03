import ProfileHeader from "@/components/UserProfile/ProfileHeader";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <ProfileHeader />
      {children}
    </div>
  );
};

export default ProfileLayout;
