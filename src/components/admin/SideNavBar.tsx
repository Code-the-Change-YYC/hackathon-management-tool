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

const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          <nav className="w-full">
            <div className="p-6">
              <h1 className={NAV_BAR_HEADER_STYLES}>HACK THE CHANGE</h1>
              <div className="mt-2">
                <h2>ADMIN</h2>
                <hr className="my-2" />
                <Link href="/admin" className={NAV_LINK_CONTAINER_STYLES}>
                  <div className="flex">
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        height={20}
                        width={20}
                        src={dashboard_icon}
                        alt="Dashboard icon"
                      />
                    </div>
                    <p>Dashboard</p>
                  </div>
                  <Image
                    height={10}
                    width={10}
                    src={arrow_icon}
                    alt="Arrow icon"
                  />
                </Link>
                <h2 className="mt-8">PARTICIPANTS</h2>
                <hr className="my-2" />
                <Link href="/admin/users" className={NAV_LINK_CONTAINER_STYLES}>
                  <div className="flex">
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        height={20}
                        width={20}
                        src={users_icon}
                        alt="User icon"
                      />
                    </div>
                    <p>View All Participants</p>
                  </div>
                  <Image
                    height={10}
                    width={10}
                    src={arrow_icon}
                    alt="Arrow icon"
                  />
                </Link>
                <Link href="/admin/teams" className={NAV_LINK_CONTAINER_STYLES}>
                  <div className="flex">
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        height={20}
                        width={20}
                        src={team_icon}
                        alt="Team icon"
                      />
                    </div>
                    <p>View All Teams</p>
                  </div>
                  <Image
                    height={10}
                    width={10}
                    src={arrow_icon}
                    alt="Arrow icon"
                  />
                </Link>
                <h2 className="mt-8">FOOD TICKETS</h2>
                <hr className="my-2" />
                <Link
                  href="/admin/scan-food-tickets"
                  className={NAV_LINK_CONTAINER_STYLES}
                >
                  <div className="flex">
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        height={20}
                        width={20}
                        src={ticket_icon}
                        alt="Ticket icon"
                      />
                    </div>
                    <p>Scan Food Tickets</p>
                  </div>
                  <Image
                    height={10}
                    width={10}
                    src={arrow_icon}
                    alt="Arrow icon"
                  />
                </Link>
                <Link
                  href="/admin/create-food-event"
                  className={NAV_LINK_CONTAINER_STYLES}
                >
                  <div className="flex">
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        height={20}
                        width={20}
                        src={add_icon}
                        alt="Create icon"
                      />
                    </div>
                    <p>Create Food Tickets</p>
                  </div>
                  <Image
                    height={10}
                    width={10}
                    src={arrow_icon}
                    alt="Arrow icon"
                  />
                </Link>
                <h2 className="mt-8">RESET/CREATE</h2>
                <hr className="my-2" />
                <Link href="/admin/reset" className={NAV_LINK_CONTAINER_STYLES}>
                  <div className="flex">
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        height={20}
                        width={20}
                        src={reset_icon}
                        alt="Reset icon"
                      />
                    </div>
                    <p>Reset/Create Hackathon</p>
                  </div>
                  <Image
                    height={10}
                    width={10}
                    src={arrow_icon}
                    alt="Arrow icon"
                  />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default SideNavBar;
