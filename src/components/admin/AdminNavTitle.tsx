"use client";

import { usePathname } from "next/navigation";

export default function AdminNavTitle() {
  const path = usePathname().replace("/admin", "");
  const getTitle = (): string => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/teams":
        return "Teams";
      case "/users":
        return "Participants";
      case "/settings":
        return "Settings";
      case "":
        return "Home";
      default:
        return "";
    }
  };
  return (
    <div className="">
      <h2 className="text-xl">{getTitle()}</h2>
      <h1>Dashboard </h1>
    </div>
  );
}
