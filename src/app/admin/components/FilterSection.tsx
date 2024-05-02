const FILTER_TILE_STYLES =
  "bg-light-grey mt-8 p-4 rounded-md text-lg text-black w-4/5 max-w-[1500px]";
const FILTER_HEADER_BAR_STYLES = "bg-white rounded-md";
const FILTER_TILE_CONTENT_STYLES = "";
const FILTER_CHECKBOX_COLUMN_STYLES =
  "flex max-w-[1200px] justify-between mx-auto p-8";
const FILTER_CHECKBOX_STLYES = "h-5 w-5 m-2";

interface Filter {
  label: string;
}

interface FilterSectionProps {
  topLabel: string;
  filterLabels: Filter[];
}

const FilterSection = ({ topLabel, filterLabels }: FilterSectionProps) => {
  return (
    <div className="flex justify-center">
      <div className={FILTER_TILE_STYLES}>
        <div className={FILTER_HEADER_BAR_STYLES}>
          <h1 className="m-2 p-4">Filters</h1>
        </div>
        <div className={FILTER_TILE_CONTENT_STYLES}>
          <label className="ml-4">
            <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
            {/* top label also separated to fit figma styling */}
            {topLabel}
          </label>
          <div className={FILTER_CHECKBOX_COLUMN_STYLES}>
            <div>
              {/* map over first column of labels since it varies between team and users */}
              {filterLabels.map((filter, index) => (
                <div key={index}>
                  <div className="ml-8">
                    <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                    <label>{filter.label}</label>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div>
                <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                <label>In-active</label>
              </div>
              <div>
                <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                <label>Short-term</label>
              </div>
              <div>
                <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                <label>Long-term</label>
              </div>
            </div>
            <div>
              <div>
                <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                <label>Archived</label>
              </div>
              <div>
                <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                <label>Rejected</label>
              </div>
              <div>
                <input type="checkbox" className={FILTER_CHECKBOX_STLYES} />
                <label>Removed</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
