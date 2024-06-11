import { useState } from "react";

const FILTER_TILE_STYLES =
  "bg-light-grey m-4 p-4 rounded-md border-awesomer-purple border text-lg text-black w-full max-w-[1500px]";
const FILTER_HEADER_BAR_STYLES = "bg-white rounded-md";
const FILTER_HEADER_BAR_TEXT_STYLES = "m-2 p-4 text-2xl font-semibold";
const FILTER_CHECKBOX_COLUMN_STYLES = "max-w-[1200px] p-8";
const FILTER_CHECKBOX_STYLES = "h-5 w-5 m-2";

interface Filter {
  label: string;
}

interface FilterSectionProps {
  topLabel: string;
  filterLabels: Filter[];
  onFilterChange: (filters: string[]) => void;
}

const FilterSection = ({
  filterLabels,
  onFilterChange,
}: FilterSectionProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (label: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = prevFilters.includes(label)
        ? prevFilters.filter((filter) => filter !== label)
        : [...prevFilters, label];
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="flex justify-center">
      <div className={FILTER_TILE_STYLES}>
        <div className={FILTER_HEADER_BAR_STYLES}>
          <h1 className={FILTER_HEADER_BAR_TEXT_STYLES}>Filters</h1>
        </div>
        <div>
          <div className={FILTER_CHECKBOX_COLUMN_STYLES}>
            <div className="flex">
              {filterLabels.map((filter, index) => (
                <div key={index}>
                  <div className="mr-10 flex items-center">
                    <input
                      type="checkbox"
                      className={FILTER_CHECKBOX_STYLES}
                      checked={selectedFilters.includes(filter.label)}
                      onChange={() => handleCheckboxChange(filter.label)}
                    />
                    <label>{filter.label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
