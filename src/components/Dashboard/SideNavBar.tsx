"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const arrow_icon = "/svgs/admin/simple_arrow.svg";
const dashboard_icon = "/svgs/admin/dashboard_icon.svg";
const users_icon = "/svgs/admin/users_icon.svg";
const team_icon = "/svgs/admin/team_icon.svg";
const ticket_icon = "/svgs/admin/ticket_icon.svg";
const add_icon = "/svgs/admin/add_square.svg";
const reset_icon = "/svgs/admin/reset_icon.svg";

const NAV_BAR_SECTION_STYLES =
  "flex flex-col items-center bg-awesomer-purple h-full transition-width duration-300 md:w-80";
const LOGO_BUTTON_STYLES =
  "mt-6 flex size-10 items-center justify-center md:size-14";
const NAV_BAR_HEADER_STYLES = "my-2 text-center text-xl md:text-2xl";
const NAV_LINK_CONTAINER_STYLES =
  "flex justify-between hover:bg-[#5E48D1] p-2 rounded-md mb-2";
const NAV_LINK_ICON_STYLES = "mr-2 flex p-2 justify-center rounded-md bg-white";
export interface DashboardLink {
  name: string;
  icon: string;
  route: string;
}
interface DashboardRoutes {
  group: string;
  routes: DashboardLink[];
}
const NavLinkContainer = ({
  dashboardLink,
}: {
  dashboardLink: DashboardLink;
}) => {
  return (
    <Link href={dashboardLink.route} className={NAV_LINK_CONTAINER_STYLES}>
      <div className="flex">
        <div className={NAV_LINK_ICON_STYLES}>
          <Image
            height={20}
            width={20}
            src={dashboardLink.icon}
            alt={`${dashboardLink.name} icon`}
          />
        </div>
        <p>{dashboardLink.name}</p>
      </div>
      <Image height={10} width={10} src={arrow_icon} alt="Arrow icon" />
    </Link>
  );
};
const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const dashboardRoutes: DashboardRoutes[] = [
    {
      group: "ADMIN",
      routes: [{ name: "Dashboard", icon: dashboard_icon, route: "/admin" }],
    },
    {
      group: "PARTICIPANTS",
      routes: [
        {
          name: "View All Participants",
          icon: users_icon,
          route: "/admin/users",
        },
        {
          name: "View All Teams",
          icon: team_icon,
          route: "/admin/teams",
        },
      ],
    },
    {
      group: "FOOD TICKETS",
      routes: [
        {
          name: "Scan Food Tickets",
          icon: ticket_icon,
          route: "/admin/scan-food-tickets",
        },
        {
          name: "Create Food Event",
          icon: add_icon,
          route: "/admin/create-food-event",
        },
      ],
    },
    {
      group: "RESET/CREATE",
      routes: [
        {
          name: "Reset/Create Hackathon",
          icon: reset_icon,
          route: "/admin/reset",
        },
      ],
    },
  ];

  return (
    <div className="relative text-sm md:text-lg">
      <div
        className={`${NAV_BAR_SECTION_STYLES} ${
          isCollapsed
            ? "w-16 md:w-[80px]"
            : "fixed left-0 top-0 z-[1000] w-60 md:w-80"
        }`}
      >
        <button className={LOGO_BUTTON_STYLES} onClick={toggleSidebar}>
          <Image
            src="/CTCLogo.svg"
            alt="Code The Change Logo"
            width={50}
            height={50}
          />
        </button>
        {!isCollapsed && (
          <nav className="w-full p-6">
            <h1 className={NAV_BAR_HEADER_STYLES}>HACK THE CHANGE</h1>
            <div className="mt-2">
              {dashboardRoutes.map((route) => (
                <div key={route.group}>
                  <h2>{route.group}</h2>
                  <hr className="my-2" />
                  {route.routes.map((r, index) => (
                    <NavLinkContainer key={index} dashboardLink={r} />
                  ))}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default SideNavBar;
