import Image from "next/image";
import Link from "next/link";

import CTC_Icon from "@/CTCLogo.svg";

const arrow_icon = "/svgs/admin/simple_arrow.svg";
const dashboard_icon = "/svgs/admin/dashboard_icon.svg";
const users_icon = "/svgs/admin/users_icon.svg";
const team_icon = "/svgs/admin/team_icon.svg";
const ticket_icon = "/svgs/admin/ticket_icon.svg";
const add_icon = "/svgs/admin/add_square.svg";
const reset_icon = "/svgs/admin/reset_icon.svg";

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
    <Link
      href={dashboardLink.route}
      className={"mb-2 flex justify-between rounded-md p-2 hover:bg-[#5E48D1]"}
    >
      <div className="flex gap-2">
        <div className={"flex justify-center rounded-md bg-white p-2"}>
          <Image
            height={20}
            width={20}
            src={dashboardLink.icon}
            alt={`${dashboardLink.name} icon`}
          />
        </div>
        <p className="flex items-center">{dashboardLink.name}</p>
      </div>
      <Image height={10} width={10} src={arrow_icon} alt="Arrow icon" />
    </Link>
  );
};
export default function SideNavBar() {
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
      group: "RESET",
      routes: [
        {
          name: "Reset Hackathon",
          icon: reset_icon,
          route: "/admin/reset",
        },
      ],
    },
    {
      group: "SCHEDULE",
      routes: [
        {
          name: "Judging Schedule",
          icon: reset_icon,
          route: "/admin/schedule",
        },
      ],
    },
  ];

  return (
    <details
      className={`transition-width md:open:w-80" relative flex h-full w-20 cursor-pointer flex-col items-center gap-2 bg-awesomer-purple text-white duration-500 z-10 open:fixed open:top-0 open:w-60 md:w-[80px]`}
    >
      <summary className="sticky top-0 list-none pt-4">
        <Image
          src={CTC_Icon}
          alt="Code The Change Logo"
          className="transition-transform hover:scale-125"
          width={50}
          height={50}
        />
      </summary>
      <h1 className="line-clamp-1 text-center text-xl font-bold md:text-2xl">
        HACK THE CHANGE
      </h1>
      <ul className="absolute inset-0 mt-28 w-full overflow-y-auto px-2">
        {dashboardRoutes.map((route) => (
          <li key={route.group}>
            <h2>{route.group}</h2>
            <hr />
            {route.routes.map((r, index) => (
              <NavLinkContainer key={index} dashboardLink={r} />
            ))}
          </li>
        ))}
      </ul>
    </details>
  );
}
