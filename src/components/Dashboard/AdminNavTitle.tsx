"use client";

import { usePathname } from "next/navigation";

export default function AdminNavTitle() {
  const paths = usePathname().split("/");
  const path = paths[paths.length - 1];
  console.log(path);
  const getTitle = (): string => {
    if (path === "admin") {
      return "Home";
    }
    return path[0].toUpperCase() + path.slice(1);
  };
  return (
    <div className="">
      <h2 className="text-xl">{getTitle()}</h2>
      <h1>Dashboard </h1>
    </div>
  );
}
