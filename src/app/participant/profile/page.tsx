import dynamic from "next/dynamic";
import KevinLoadingRing from "@/components/KevinLoadingRing";

// Dynamically import UserProfile with preloading
const UserProfile = dynamic(
  () => import("@/components/UserProfile/UserProfile"),
  {
    ssr: true,
    loading: () => (
      <div className="flex w-full flex-1 items-center justify-center">
        <KevinLoadingRing />
      </div>
    ),
  },
);

export default function Profile() {
  return <UserProfile />;
}
