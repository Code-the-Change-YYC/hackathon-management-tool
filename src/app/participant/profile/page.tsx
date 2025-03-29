import dynamic from "next/dynamic";

import LoadingRing from "@/components/LoadingRing";

const UserProfile = dynamic(
  () => import("@/components/UserProfile/UserProfile"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
        <LoadingRing />
      </div>
    ),
  },
);

export default function Profile() {
  return <UserProfile />;
}
