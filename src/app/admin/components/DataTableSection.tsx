import Image from "next/image";
import { useState } from "react";

const search_icon = "/svgs/admin/search_icon.svg";
const exit_icon = "/svgs/admin/exit_icon.svg";

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
const EDIT_BUTTON_STYLES = "mr-6 text-awesomer-purple";
const EDIT_MODE_TEXT_INPUT_STYLES =
  "w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple";

const CHANGE_PAGE_BUTTON_STYLING =
  "rounded-md border border-awesomer-purple bg-white px-6 hover:bg-awesomer-purple hover:text-white";
const CHANGE_PAGE_BUTTON_TEXT_STYLING = "rounded-md bg-white p-2 px-8";

interface DataTableProps {
  tableData: Array<Array<string>>;
  tableHeaders: Array<{ columnHeader: string; className: string }>;
  showViewButton?: boolean;
}

const DataTableSection = (props: DataTableProps) => {
  const { tableData, tableHeaders, showViewButton = false } = props;
  const [editModes, setEditModes] = useState(
    Array(tableData.length).fill(false),
  );
  const [editedValues, setEditedValues] = useState(tableData);
  const [showPopup, setShowPopup] = useState(false);

  const toggleEditMode = (index: number) => {
    const newEditModes = [...editModes];
    newEditModes[index] = !newEditModes[index];
    setEditModes(newEditModes);
  };

  const handleViewButtonClick = () => {
    setShowPopup(true);
  };

  // need to change the way this is handled once connected to database
  const handleInputChange = (
    value: string,
    rowIndex: number,
    cellIndex: number,
  ) => {
    const newEditedValues = [...editedValues];
    newEditedValues[rowIndex][cellIndex] = value;
    setEditedValues(newEditedValues);
  };

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
        <div className="overflow-x-auto">
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
              {tableData.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-light-grey"}`}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <td className={DATA_TABLE_CELL_STYLES} key={cellIndex}>
                      {editModes[rowIndex] ? (
                        <input
                          type="text"
                          value={editedValues[rowIndex][cellIndex]}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              rowIndex,
                              cellIndex,
                            )
                          }
                          className={EDIT_MODE_TEXT_INPUT_STYLES}
                        />
                      ) : (
                        cellData
                      )}
                    </td>
                  ))}
                  <td className="min-w-[250px] p-3 text-center">
                    <button
                      className={EDIT_BUTTON_STYLES}
                      onClick={() => toggleEditMode(rowIndex)}
                    >
                      {editModes[rowIndex] ? "Save" : "Edit"}
                    </button>
                    {showViewButton && (
                      <button
                        className="mr-6 text-awesome-purple"
                        onClick={() => handleViewButtonClick()}
                      >
                        View
                      </button>
                    )}
                    <button className="text-dark-pink">Delete</button>
                  </td>
                </tr>
              ))}
              <tr className="h-10 bg-awesome-purple">
                {Array(tableHeaders.length + 1)
                  .fill(null)
                  .map((_, index) => (
                    <td key={index}></td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
        {showPopup && (
          <div className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/40">
            <div className="w-4/5 rounded-md bg-white p-4">
              <div className="mb-2 flex justify-between">
                <h1 className="text-3xl font-semibold">Team Name</h1>
                <button className="mr-2" onClick={() => setShowPopup(false)}>
                  <Image
                    src={exit_icon}
                    alt="Exit page icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div className="mb-8 rounded-md border border-awesomer-purple bg-light-grey p-2">
                <table className="w-full border-separate border-spacing-2 text-left">
                  <thead>
                    <tr>
                      <th className="w-1/2 rounded-md bg-white p-2">Members</th>
                      <th className="rounded-md bg-white p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <div className="my-4 flex items-center justify-between">
          {/* replace dynamically */}
          <h2 className="text-lg">Showing 1 of 10 of 500 entries</h2>
          <div className="flex text-sm text-awesomer-purple">
            <p className={CHANGE_PAGE_BUTTON_TEXT_STYLING}>Previous</p>
            <button className={CHANGE_PAGE_BUTTON_STYLING}>&lt;</button>
            <button className={CHANGE_PAGE_BUTTON_STYLING}>&gt;</button>
            <p className={CHANGE_PAGE_BUTTON_TEXT_STYLING}>Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableSection;
