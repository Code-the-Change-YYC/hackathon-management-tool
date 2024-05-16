import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import TeamProfile from "@/components/UserProfile/TeamProfile";
import { UserContextProvider } from "@/components/contexts/UserContext";

export default function TeamDetails() {
  return (
    <div className="w-full">
      <UserContextProvider>
        <ProfileHeader />
        <TeamProfile />
      </UserContextProvider>
    </div>
  );
}
