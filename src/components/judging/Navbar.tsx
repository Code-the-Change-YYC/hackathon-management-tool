"use client";

import Link from "next/link";

export function NavBar() {
  // Will add the actual routes when the pages are
  const navigation = [
    {
      name: "Dashboard",
      href: "/judging",
    },
    {
      name: "Schedule",
      href: "/schedule",
    },
    {
      name: "Assigned Teams",
      href: "/assigned-teams",
    },
    {
      name: "Rubric",
      href: "/rubric",
    },
  ];

  return (
    <nav className="border-b bg-white text-awesomer-purple">
      <div className="mx-auto flex h-20 items-center justify-center space-x-48 pl-8">
        {navigation.map((item) => {
          return (
            <Link key={item.name} href={item.href} className="text-2xl">
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
