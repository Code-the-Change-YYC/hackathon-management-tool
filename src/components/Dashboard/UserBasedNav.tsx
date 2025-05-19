"use client";

import ParticipantNav from "@/components/Dashboard/ParticipantNav";
import { useUser } from "@/components/contexts/UserContext";
import JudgeNav from "@/components/judging/Navbar";

export default function UserBasedNav() {
  const { currentUser } = useUser();
  const loading = !currentUser; // Assume loading is true when currentUser is null or undefined

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // Assume that currentUser.role is set appropriately (e.g. "Admin", "Judge", or "Participant")
  const role = currentUser?.role || "Participant";

  if (role === "Admin") {
    // For Admins, render the side and top navigation together
    return <div className="flex "></div>;
  } else if (role === "Judge") {
    return <JudgeNav />;
  } else {
    return <ParticipantNav />;
  }
}
