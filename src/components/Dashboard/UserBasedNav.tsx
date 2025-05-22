"use client";

import Link from "next/link";
import { useState } from "react";

import { useUser } from "@/components/contexts/UserContext";

interface NavItem {
  name: string;
  route: string;
}

const navigationMap: Record<string, NavItem[]> = {
  Admin: [
    { name: "Dashboard", route: "/admin" },
    { name: "View All Participants", route: "/admin/users" },
    { name: "View All Teams", route: "/admin/teams" },
    { name: "Scan Food Tickets", route: "/admin/scan-food-tickets" },
    { name: "Create Food Event", route: "/admin/create-food-event" },
    { name: "Judging Schedule", route: "/admin/schedule" },
  ],
  Judge: [
    { name: "Dashboard", route: "/judging" },
    { name: "Schedule", route: "/judging/schedule" },
    { name: "Assigned Teams", route: "/judging/assigned-teams" },
    { name: "Rubric", route: "/judging/rubric" },
  ],
  Participant: [
    { name: "Dashboard", route: "/participant" },
    { name: "Food Ticket", route: "/participant/profile/food-ticket" },
    { name: "Important Information", route: "/participant/important-info" },
    { name: "Teams Judging Information", route: "/participant/judging-info" },
  ],
};

function GenericNav({ navItems }: { navItems: NavItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {!isMenuOpen && (
        <button
          onClick={toggleMenu}
          className="absolute left-8 top-12 z-50 p-2 text-awesomer-purple"
          aria-label="Toggle menu"
        >
          <div className="relative flex size-8 flex-col justify-center space-y-1.5">
            <span className="block h-[2.5px] w-8 bg-current"></span>
            <span className="block h-[2.5px] w-8 bg-current"></span>
            <span className="block h-[2.5px] w-8 bg-current"></span>
          </div>
        </button>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleMenu} />
      )}

      <div
        className={`fixed left-0 top-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute left-4 top-4 z-50 p-2 text-awesomer-purple"
          aria-label="Close menu"
        >
          <div className="relative size-6">
            <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rotate-45 bg-current"></span>
            <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 -rotate-45 bg-current"></span>
          </div>
        </button>
        <div className="flex flex-col px-4 pt-20">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.route}
              className="rounded px-2 py-3 text-xl text-awesomer-purple hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default function UserBasedNav() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const role = currentUser?.role || "Participant";
  const navItems = navigationMap[role] || navigationMap.Participant;

  return <GenericNav navItems={navItems} />;
}
