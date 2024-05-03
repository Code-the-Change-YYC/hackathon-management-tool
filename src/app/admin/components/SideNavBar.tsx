import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const arrow_icon = "/svgs/admin/simple_arrow.svg";
const dashboard_icon = "/svgs/admin/dashboard_icon.svg";
const judge_icon = "/svgs/admin/judges_icon.svg";
const users_icon = "/svgs/admin/users_icon.svg";
const team_icon = "/svgs/admin/team_icon.svg";

const NAV_BAR_SECTION_STYLES = "flex flex-col items-center bg-awesomer-purple";
const NAV_LINK_CONTAINER_STYLES =
  "flex justify-between hover:bg-[#5E48D1] p-2 rounded-md";
const NAV_LINK_ICON_CONTAINER_STYLES = "flex items-center";
const NAV_LINK_ICON_STYLES =
  "mr-2 flex size-8 justify-center rounded-md bg-white";

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={NAV_BAR_SECTION_STYLES}>
      <button className="mt-4" onClick={togglePanel}>
        <Image
          src="/CTCLogo.svg"
          alt="Code The Change Logo"
          width={isOpen ? 90 : 70}
          height={70}
        />
      </button>
      <nav className={`${isOpen ? "w-80" : "w-24"}`}>
        {isOpen && (
          <div className="p-6">
            <h1 className="my-2 text-center text-xl">HACK THE CHANGE</h1>
            <div className="font-thin">
              <div className="mb-8">
                <h2 className="text-xl font-normal">Admin</h2>
                <hr className="my-2" />
                <Link className={NAV_LINK_CONTAINER_STYLES} href="#">
                  <div className={NAV_LINK_ICON_CONTAINER_STYLES}>
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        src={dashboard_icon}
                        alt="Home icon"
                        width={20}
                        height={20}
                      />
                    </div>
                    Dashboard
                  </div>
                  <Image
                    src={arrow_icon}
                    alt="Simple arrow"
                    width={8}
                    height={8}
                  />
                </Link>
              </div>
              <div className="mb-8">
                <h2>PARTICIPANTS</h2>
                <hr className="my-2" />
                <Link className={NAV_LINK_CONTAINER_STYLES} href="/admin/users">
                  <div className={NAV_LINK_ICON_CONTAINER_STYLES}>
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        src={users_icon}
                        alt="User icon"
                        width={20}
                        height={20}
                      />
                    </div>
                    View all participants
                  </div>
                  <Image
                    src={arrow_icon}
                    alt="Simple arrow"
                    width={8}
                    height={8}
                  />
                </Link>
                <br />
                <Link className={NAV_LINK_CONTAINER_STYLES} href="/admin/teams">
                  <div className={NAV_LINK_ICON_CONTAINER_STYLES}>
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        src={team_icon}
                        alt="Team icon"
                        width={20}
                        height={20}
                      />
                    </div>
                    View all teams
                  </div>
                  <Image
                    src={arrow_icon}
                    alt="Simple arrow"
                    width={8}
                    height={8}
                  />
                </Link>
              </div>
              <div className="mb-8">
                <h2>JUDGES</h2>
                <hr className="my-2" />
                <Link className={NAV_LINK_CONTAINER_STYLES} href="#">
                  <div className={NAV_LINK_ICON_CONTAINER_STYLES}>
                    <div className={NAV_LINK_ICON_STYLES}>
                      <Image
                        src={judge_icon}
                        alt="Badge icon"
                        width={22}
                        height={22}
                      />
                    </div>
                    View all judges
                  </div>
                  <Image
                    src={arrow_icon}
                    alt="Simple arrow"
                    width={8}
                    height={8}
                  />
                </Link>
              </div>
              <div>
                <h2>FOOD TICKETS</h2>
                <hr className="my-2" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default SideNavBar;
