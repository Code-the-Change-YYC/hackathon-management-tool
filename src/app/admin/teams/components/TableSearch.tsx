"use client";

import Image from "next/image";
import { memo } from "react";

import search_icon from "@/svgs/admin/search_icon.svg";

const TableSearch = ({
  tableDataLength,
  handleSearchChange,
}: {
  tableDataLength: number;
  handleSearchChange: (e: string) => void;
}) => {
  return (
    <div className="relative flex w-full items-center justify-between rounded-t-md bg-white px-4 py-2">
      <h1 className="whitespace-nowrap py-6 pr-2 text-2xl font-semibold">
        Search Results ({tableDataLength}
        {" record"}
        {tableDataLength !== 1 && "s"} found)
      </h1>
      <div className="relative flex w-2/5 min-w-[180px] max-w-[500px] group-[.teams]:ml-12 group-[.users]:ml-44 md:group-[.users]:ml-56">
        <input
          type="text"
          placeholder="Search name"
          className="h-3/5 w-full rounded-md border border-black p-4 pr-10 font-light"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Image
          src={search_icon}
          alt="Magnifying glass icon"
          width={30}
          height={30}
          className={"absolute right-3 top-1/2 -translate-y-1/2"}
        />
      </div>
    </div>
  );
};

export default memo(TableSearch);
