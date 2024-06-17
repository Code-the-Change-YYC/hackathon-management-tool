import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";

import AdminNavTitle from "./AdminNavTitle";

export default function TopNavBar() {
  return (
    <>
      <div className=" flex w-full justify-between bg-white p-4 px-8 text-4xl font-semibold">
        <AdminNavTitle />
        <div className="flex flex-row items-center gap-4">
          <IoIosSearch />
          <GoBell />
          <IoMailOutline />
          <PiUserCircleFill size={64} />
        </div>
      </div>
    </>
  );
}
