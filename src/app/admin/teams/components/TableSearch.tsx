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
    <div className="relative flex items-center justify-between rounded-t-md bg-white px-4 py-2">
      <h1 className="py-6 text-2xl font-semibold">
        Search Results ({tableDataLength}
        {" record"}
        {tableDataLength !== 1 && "s"} found)
      </h1>
      <input
        type="text"
        placeholder="Search name"
        className="h-3/5 w-2/5 max-w-[500px] rounded-md border border-black p-4 font-light"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <Image
        src={search_icon}
        alt="Magnifying glass icon"
        width={30}
        height={30}
        className={"absolute right-8 top-1/2 -translate-y-1/2"}
      />
    </div>
  );
};

export default memo(TableSearch);
