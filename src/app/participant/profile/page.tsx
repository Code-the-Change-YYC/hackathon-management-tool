import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function Profile() {
  return (
    <main className="w-full">
      <ProfileHeader />
      <UserProfile />
    </main>
  );
}
