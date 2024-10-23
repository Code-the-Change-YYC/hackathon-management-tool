import Link from "next/link";
import { useEffect, useState } from "react";

import { UserType, useUser } from "../contexts/UserContext";

const LINK_STYLES =
  "md:mx-10 align-center text-center text-1xl md:text-md my-12 flex flex-row gap-8 sm:gap-16 text-[#FF6B54]";
const ACTIVE_LINK_STYLES = "underline";

export default function ProfileLinks() {
  const { currentUser } = useUser();
  const dashboardLink = `/${currentUser.type === UserType.Admin ? "admin" : "participant"}`;
  const links = [
    { href: "/participant/profile", text: "My Details" },
    ...(currentUser.type !== UserType.Judge &&
    currentUser.type !== UserType.Admin
      ? [
          { href: "/participant/profile/team-details", text: "Team Details" },
          { href: "/participant/profile/food-ticket", text: "Food Ticket" },
        ]
      : []),
    {
      href: dashboardLink,
      text: "Dashboard",
    },
  ];
  const [activeLink, setActiveLink] = useState(links[0].href);
  useEffect(() => {
    // Set active link based on current URL when component mounts
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <div className={LINK_STYLES}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${activeLink === link.href && ACTIVE_LINK_STYLES}`}
          onClick={() => setActiveLink(link.href)}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}
