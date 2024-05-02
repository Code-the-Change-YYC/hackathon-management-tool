const DATA_TABLE_SECTION_STYLES =
  "bg-light-grey m-8 p-4 rounded-md text-lg text-black w-4/5 max-w-[1500px]";
const SEARCH_RESULTS_BAR_STYLES = "bg-white rounded-md";
const DATA_TABLE_CONTENT_STYLES =
  "mt-6 w-full border-separate border-spacing-x-2 text-left";
const DATA_TABLE_CELL_STYLES = "rounded-md p-6";

const DataTableSection = ({ tableData, tableHeaders }) => {
  return (
    <div className="flex justify-center">
      <div className={DATA_TABLE_SECTION_STYLES}>
        {/* search results bar */}
        <div className={SEARCH_RESULTS_BAR_STYLES}>
          {/* the 100 would be replaced dynamically */}
          <h1 className="m-2 p-4">Search Results (100 teams found)</h1>
        </div>
        <div>
          <table className={DATA_TABLE_CONTENT_STYLES}>
            <thead className="bg-dark-grey">
              <tr className="text-white">
                {/* Corrected mapping with return statement */}
                {tableHeaders.map((header, index) => (
                  <th
                    className={`${DATA_TABLE_CELL_STYLES} ${header.className}`}
                    key={index}
                  >
                    {header.columnHeader}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-medium-grey"}`}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <td className={DATA_TABLE_CELL_STYLES} key={cellIndex}>
                      {cellData}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTableSection;
