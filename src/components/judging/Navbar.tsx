"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation links
  const navigation = [
    {
      name: "Dashboard",
      href: "/judging",
    },
    {
      name: "Schedule",
      href: "/judging/schedule",
    },
    {
      name: "Assigned Teams",
      href: "/judging/assigned-teams",
    },
    {
      name: "Rubric",
      href: "/judging/rubric",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger button - absolutely positioned in the top left */}
      {!isMenuOpen && (
        <button
          onClick={toggleMenu}
          className="absolute left-8 top-12 z-50 p-2 text-awesomer-purple"
          aria-label="Toggle menu"
        >
          {/* CSS-only hamburger icon */}
          <div className="relative flex size-8 flex-col justify-center space-y-1.5">
            <span className="block h-[2.5px] w-8 bg-current"></span>
            <span className="block h-[2.5px] w-8 bg-current"></span>
            <span className="block h-[2.5px] w-8 bg-current"></span>
          </div>
        </button>
      )}

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />
      )}

      {/* Navigation menu - slides in from left */}
      <div
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close (X) icon inside the navigation menu */}
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

        {/* Navigation links */}
        <div className="flex flex-col px-4 pt-20">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
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
