const FILTER_TILE_STYLES =
  "bg-light-grey m-4 p-4 rounded-md border-awesomer-purple border text-lg text-black w-full max-w-[1500px]";
const FILTER_HEADER_BAR_STYLES = "bg-white rounded-md";
const FILTER_TILE_CONTENT_STYLES = "";
const FILTER_CHECKBOX_COLUMN_STYLES = "max-w-[1200px] p-8";
const FILTER_CHECKBOX_STLYES = "h-5 w-5 m-2";

interface Filter {
  label: string;
}

interface FilterSectionProps {
  topLabel: string;
  filterLabels: Filter[];
}

const FilterSection = ({ filterLabels }: FilterSectionProps) => {
  return (
    <div className="flex justify-center">
      <div className={FILTER_TILE_STYLES}>
        <div className={FILTER_HEADER_BAR_STYLES}>
          <h1 className="m-2 p-4 text-2xl font-semibold">Filters</h1>
        </div>
        <div className={FILTER_TILE_CONTENT_STYLES}>
          <div className={FILTER_CHECKBOX_COLUMN_STYLES}>
            <div className="flex">
              {/* map over first column of labels since it varies between team and users */}
              {filterLabels.map((filter, index) => (
                <div key={index}>
                  <div className="mr-10 flex items-center">
                    <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
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
