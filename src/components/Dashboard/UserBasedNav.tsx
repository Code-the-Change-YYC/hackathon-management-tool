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

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="group fixed left-20 top-12 z-30 rounded p-2 transition-colors duration-200 hover:bg-awesome-purple"
        aria-label="Toggle menu"
        style={{ display: isMenuOpen ? "block" : "block" }}
      >
        <div className="relative flex size-8 flex-col justify-center space-y-1.5">
          <span className="block h-[2.5px] w-8 bg-awesomer-purple transition-colors duration-200 group-hover:bg-white"></span>
          <span className="block h-[2.5px] w-8 bg-awesomer-purple transition-colors duration-200 group-hover:bg-white"></span>
          <span className="block h-[2.5px] w-8 bg-awesomer-purple transition-colors duration-200 group-hover:bg-white"></span>
        </div>
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleMenu} />
      )}

      <div
        className={`fixed left-0 top-0 z-40 flex h-full w-56 flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="group fixed left-20 top-12 z-50 rounded-full p-2 text-awesomer-purple transition-colors hover:bg-awesome-purple "
          aria-label="Close menu"
        >
          <div className="relative size-8">
            <span className="absolute left-0 top-1/2 h-0.5 w-8 -translate-y-1/2 rotate-45 bg-current transition-colors duration-200 group-hover:bg-white"></span>
            <span className="absolute left-0 top-1/2 h-0.5 w-8 -translate-y-1/2 -rotate-45 bg-current transition-colors duration-200 group-hover:bg-white"></span>
          </div>
        </button>

        <div className="mt-28 w-full border-t border-gray-100" />
        <div className="flex-1 flex-col overflow-y-auto px-4 pb-0 pt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.route}
              className="group relative flex items-center rounded-r-2xl px-2 py-3 text-xl text-awesomer-purple transition-all duration-200 hover:bg-awesome-purple hover:pl-6 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="absolute left-0 top-0 h-full w-2 rounded bg-awesomer-purple opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t bg-awesome-purple p-4">
          <div className=" text-center text-xs text-awesomer-purple">
            Navigation Menu
          </div>
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
