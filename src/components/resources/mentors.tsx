"use client";

import { useState } from "react";
import EventsMembers from "./eventsMembers";
import GeneralMembers from "./generalMembers";
import IndustryMembers from "./industryMembers";
import TechMembers from "./techMembers";

export default function Mentors() {
  const roles = ["events", "tech", "general", "industry"];
  const [isSelected, setIsSelected] = useState<string>("events");

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-row items-center justify-center gap-10">
        {roles.map((role) => (
          <div>
            <button
              onClick={() => setIsSelected(role)}
              className={`mb-8 h-16 w-40 rounded-full border-4 text-center text-2xl font-bold transition-all duration-200 ${isSelected === role ? "border-dark-green bg-pastel-green text-dark-green" : "border-pastel-green bg-dark-green text-white hover:scale-105"}`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </div>
        ))}
      </div>
      {isSelected === "events" && <EventsMembers />}
      {isSelected === "tech" && <TechMembers />}
      {isSelected === "general" && <GeneralMembers />}
      {isSelected === "industry" && <IndustryMembers />}
    </div>
  );
}
