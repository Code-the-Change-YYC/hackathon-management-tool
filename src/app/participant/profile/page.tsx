import dynamic from "next/dynamic";

// Dynamically import UserProfile with preloading
const UserProfile = dynamic(
  () => import("@/components/UserProfile/UserProfile"),
  {
    ssr: false,
    loading: () => <p>Loading user profile...</p>,
  },
);

export default function Profile() {
  return <UserProfile />;
}
