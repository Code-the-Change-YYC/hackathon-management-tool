import Link from "next/link";
import { useEffect, useState } from "react";

const LINK_STYLES =
  "md:mx-10 align-center text-center text-1xl md:text-md my-12 flex flex-row gap-16 text-[#FF6B54]";
const ACTIVE_LINK_STYLES = "underline";

export default function ProfileLinks() {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set active link based on current URL when component mounts
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <div className={LINK_STYLES}>
      <Link
        href="/participant/profile"
        className={`${activeLink === "/participant/profile" ? ACTIVE_LINK_STYLES : ""}`}
        onClick={() => setActiveLink("/participant/profile")}
      >
        My Details
      </Link>
      <Link
        href="/participant/profile/team-details"
        className={`${activeLink === "/participant/profile/team-details" ? ACTIVE_LINK_STYLES : ""}`}
        onClick={() => setActiveLink("/participant/profile/team-details")}
      >
        Team Details
      </Link>
      <Link href="/participant/profile/food-ticket">Food Ticket</Link>
    </div>
  );
}
