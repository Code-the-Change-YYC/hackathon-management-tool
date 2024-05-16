import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import UserProfile from "@/components/UserProfile/UserProfile";
import { UserContextProvider } from "@/components/contexts/UserContext";

export default function Profile() {
  return (
    <main className="w-full">
      <UserContextProvider>
        <ProfileHeader />
        <UserProfile />
      </UserContextProvider>
    </main>
  );
}
