"use client";

import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const listOfRoles = ["Participant", "Judge"] as const;

const DROPDOWN_STYLES =
  "bg-light-grey mt-8 mb-8 p-4 rounded-md text-lg text-black w-4/5 max-w-[1500px]";
const DROPDOWN_HEADER_BAR_STYLES = "bg-gray-200 rounded-md p-10";
const DROPDOWN_CONTENT_STYLES =
  "relative flex flex-col items-center w-[340px] h-[100px] rounded ";

export default function DropDownRole() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center ">
      <div className={DROPDOWN_STYLES}>
        <div className={DROPDOWN_HEADER_BAR_STYLES}>
          <h1 className="my-4 font-bold">Role</h1>
          <div className={DROPDOWN_CONTENT_STYLES}>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-lg border-2 border-[#A689FF] bg-white p-4 font-bold text-black duration-100 active:border-[#A689FF] active:text-black"
            >
              Select Role
              {!isOpen ? (
                <AiOutlineCaretDown className="mx-2 h-8" />
              ) : (
                <AiOutlineCaretUp className="mx-2 h-8" />
              )}
            </button>
            {isOpen && (
              <div className="item-start absolute top-20 flex w-full flex-col rounded-lg bg-white p-2">
                {listOfRoles.map((role, index) => (
                  <div
                    className="flex w-full cursor-pointer justify-between rounded-r-lg border-l-4 border-l-transparent p-4 hover:border-l-[#A689FF] hover:bg-gray-200"
                    key={index}
                  >
                    <h3 className="font-bold">{role}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
