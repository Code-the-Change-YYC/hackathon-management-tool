import Image from "next/image";

const search_icon = "/svgs/admin/search_icon.svg";

const DATA_TABLE_SECTION_STYLES =
  "bg-light-grey border border-awesomer-purple m-4 p-4 rounded-md text-lg text-black w-full max-w-[1500px]";

const SEARCH_RESULTS_SECTION_STYLES =
  "bg-white rounded-t-md flex justify-between items-center px-4 py-2 relative";
const SEARCH_RESULTS_TEXT_STYLES = "py-6 text-2xl font-semibold";
const SEARCH_BAR_STYLES =
  "border rounded-md border-black p-4 font-light h-3/5 w-2/5 max-w-[500px]";
const SEARCH_ICON_STYLES = "absolute right-8 top-1/2 -translate-y-1/2";

const DATA_TABLE_CONTENT_STYLES =
  "w-full border-separate border-spacing-x-0.5 text-left";
const DATA_TABLE_HEADER_CELL_STYLES = "p-3 font-normal text-xl";
const DATA_TABLE_CELL_STYLES = "p-3 py-4 text-md font-light";

interface DataTableProps {
  tableData: Array<Array<string>>;
  tableHeaders: Array<{ columnHeader: string; className: string }>;
}

const DataTableSection = (props: DataTableProps) => {
  const { tableData, tableHeaders } = props;
  return (
    <div className="flex justify-center">
      <div className={DATA_TABLE_SECTION_STYLES}>
        {/* search results bar */}
        <div className={SEARCH_RESULTS_SECTION_STYLES}>
          {/* the 100 would be replaced dynamically */}
          <h1 className={SEARCH_RESULTS_TEXT_STYLES}>
            Search Results (100 teams found)
          </h1>
          <input
            type="text"
            placeholder="Search user"
            className={SEARCH_BAR_STYLES}
          />
          <Image
            src={search_icon}
            alt="Magnifying glass icon"
            width={15}
            height={15}
            className={SEARCH_ICON_STYLES}
          />
        </div>
        <div>
          <table className={DATA_TABLE_CONTENT_STYLES}>
            <thead className="bg-dark-grey">
              <tr className="bg-awesome-purple text-white">
                {/* Corrected mapping with return statement */}
                {tableHeaders.map((header, index) => (
                  <th
                    className={`${DATA_TABLE_HEADER_CELL_STYLES} ${header.className}`}
                    key={index}
                  >
                    {header.columnHeader}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-light-grey"}`}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <td className={DATA_TABLE_CELL_STYLES} key={cellIndex}>
                      {cellData}
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <button className="mr-6 text-awesomer-purple">Edit</button>
                    <button className="text-dark-pink">Delete</button>
                  </td>
                </tr>
              ))}
              <tr className="h-10 bg-awesome-purple">
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="my-4 flex items-center justify-between">
          {/* replace dynamically */}
          <h2 className="text-lg">Showing 1 of 10 of 500 entries</h2>
          <div className="flex text-center text-sm text-awesomer-purple">
            <p className="rounded-md bg-white p-2 px-8">Previous</p>
            <button className="rounded-md border border-awesomer-purple bg-white px-6 hover:bg-awesomer-purple hover:text-white">
              &lt;
            </button>
            <button className="rounded-md border border-awesomer-purple bg-white px-6 hover:bg-awesomer-purple hover:text-white">
              &gt;
            </button>
            <p className="rounded-md bg-white p-2 px-8">Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableSection;
