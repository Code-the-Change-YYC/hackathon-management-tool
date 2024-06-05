"use client";

import { useState } from "react";

const BUTTON_STYLES =
  "flex w-full items-center justify-between rounded-lg border-2 border-[#A689FF] bg-white p-4 font-bold text-black duration-100 active:border-[#A689FF] active:text-black";
const DROPDOWN_STYLES =
  "bg-light-grey border border-awesomer-purple m-4 p-4 rounded-md text-lg text-black w-full max-w-[1500px]";
const DROPDOWN_HEADER_BAR_STYLES = "bg-white rounded-md p-10";
const DROPDOWN_CONTENT_STYLES =
  "relative flex flex-col items-center w-[340px] h-[100px] rounded border-[#A689FF]";
const DROPDOWN_ITEM_STYLES =
  "flex w-full cursor-pointer justify-between rounded-r-lg border-l-4 border-l-transparent p-4 hover:border-l-[#A689FF] hover:bg-white";

interface Filter {
  label: string; // label comes from filter array of objects
}

interface FilterUserProps {
  filterLabels: Filter[]; //Filter[] is an array of objects with the label: role
  onFilterChange: (filters: string[]) => void;
}

const FilterUser = ({ filterLabels, onFilterChange }: FilterUserProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleDropDownRoleChange = (label: string) => {
    setSelectedFilters((prevFilters) => {
      console.log(label); //label is the role selected from the dropdown
      // const newFilters = prevFilters.includes(label)
      //   ? prevFilters.filter((filter) => filter !== label)
      //   : [...prevFilters, label];
      // onFilterChange(newFilters);
      // console.log(newFilters);
      // return newFilters;

      const newFilters =
        label === "All roles"
          ? ["All roles"]
          : prevFilters.includes(label)
            ? prevFilters.filter((filter) => filter !== label)
            : [
                ...prevFilters.filter(
                  (filter) =>
                    filter !== "All roles" &&
                    filter !== "Admin" &&
                    filter !== "Judge" &&
                    filter !== "Participant",
                ),
                label,
              ];

      onFilterChange(newFilters);
      return newFilters;
    });
  };
  return (
    <div className="flex justify-center ">
      <div className={DROPDOWN_STYLES}>
        <div className={DROPDOWN_HEADER_BAR_STYLES}>
          <h1 className="my-4 font-bold">Role</h1>
          <div className={DROPDOWN_CONTENT_STYLES}>
            <div className={DROPDOWN_CONTENT_STYLES}>
              <select
                className={BUTTON_STYLES}
                onChange={(e) => handleDropDownRoleChange(e.target.value)}
              >
                <option>Select a role</option>
                {filterLabels.map((filter, index) => (
                  <option
                    key={index}
                    value={filter.label}
                    selected={selectedFilters.includes(filter.label)}
                    style={{ color: "white", backgroundColor: "#A689FF" }}
                  >
                    {filter.label}
                  </option>
                ))}
              </select>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterUser;
