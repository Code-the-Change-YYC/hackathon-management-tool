"use client";

import { useState } from "react";
import EventsMembers from "./eventsMembers";
import GeneralMembers from "./generalMembers";
import IndustryMembers from "./industryMembers";
import TechMembers from "./techMembers";

export default function Mentors() {
  const roles = ["event", "tech", "general", "industry"];
  const [isSelected, setIsSelected] = useState<string>("event");

  return (
    <div className="z-10 flex flex-col items-center justify-center gap-5">
      <div className="grid w-full grid-cols-2 justify-items-center px-4 md:flex md:justify-center lg:gap-12">
        {roles.map((role) => (
          <div>
            <button
              onClick={() => setIsSelected(role)}
              className={`mb-5 h-14 w-36 rounded-full border-4 text-center text-xl font-bold transition-all duration-200 md:mb-8 md:h-16 md:w-40 md:text-2xl ${isSelected === role ? "border-dark-green bg-pastel-green text-dark-green" : "border-pastel-green bg-dark-green text-white hover:scale-105"}`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </div>
        ))}
      </div>
      {isSelected === "event" && <EventsMembers />}
      {isSelected === "tech" && <TechMembers />}
      {isSelected === "general" && <GeneralMembers />}
      {isSelected === "industry" && <IndustryMembers />}
    </div>
  );
}
