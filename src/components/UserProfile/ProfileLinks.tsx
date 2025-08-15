import Link from "next/link";
import { useEffect, useState } from "react";
import { UserType, useUser } from "../contexts/UserContext";

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
    <div className="align-center text-1xl md:text-md my-12 flex flex-row justify-center gap-8 text-center text-grapefruit sm:gap-16 md:mx-10">
      {currentUser.id &&
        links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${activeLink === link.href && "underline"}`}
            onClick={() => setActiveLink(link.href)}
          >
            {link.text}
          </Link>
        ))}
    </div>
  );
}
