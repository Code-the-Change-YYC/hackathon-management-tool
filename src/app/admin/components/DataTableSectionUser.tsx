import Image from "next/image";
import { useEffect, useState } from "react";

import PopupUser from "@/app/admin/components/PopupTileUser";

const SEARCH_RESULTS_SECTION_STYLES =
  "bg-white rounded-t-md flex justify-between items-center px-4 py-2 relative";
const SEARCH_RESULTS_TEXT_STYLES = "py-6 text-2xl font-semibold";
const SEARCH_BAR_STYLES =
  "border rounded-md border-black p-4 font-light h-3/5 w-2/5 max-w-[500px]";
const SEARCH_ICON_STYLES = "absolute right-8 top-1/2 -translate-y-1/2";

const DATA_TABLE_SECTION_STYLES =
  "bg-light-grey border border-awesomer-purple m-4 p-4 rounded-md text-lg text-black w-full max-w-[1500px]";
const DATA_TABLE_CONTENT_STYLES =
  "w-full border-separate border-spacing-x-0.5 text-left";
const DATA_TABLE_HEADER_CELL_STYLES = "p-3 font-normal text-xl bg-[#A689FF]";
const DATA_TABLE_CELL_STYLES = "p-3 py-4 text-md font-light";

const EDIT_BUTTON_STYLES = "mr-6 text-awesomer-purple";
const EDIT_MODE_TEXT_INPUT_STYLES =
  "w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple";
const CHANGE_PAGE_BUTTON_STYLING =
  "rounded-md border border-awesomer-purple bg-white px-6 hover:bg-awesomer-purple hover:text-white";
const CHANGE_PAGE_BUTTON_TEXT_STYLING = "rounded-md bg-white p-2 px-8";

const search_icon = "/svgs/admin/search_icon.svg";

const entries_per_page = 10;

interface DataTableProps {
  tableData: Array<Array<string>>;
  tableHeaders: Array<{ columnHeader: string; className: string }>;
  userData?: Array<any>;
  tableDataMutation: any;
}

const DataTableSectionUser = (props: DataTableProps) => {
  const { tableData, tableHeaders, userData = [], tableDataMutation } = props;

  const [editModes, setEditModes] = useState(
    Array(tableData.length).fill(false), //Create an array that is the same length as tableData, with all values set to false
  );

  const [editedValues, setEditedValues] = useState<string[][]>([]); // Create a state to store the edited values

  useEffect(() => {
    if (tableData.length > 0) {
      const formattedEditedValues = tableData.map((rowData) => [...rowData]);
      setEditedValues(formattedEditedValues);
    }
  }, [tableData]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageData, setCurrentPageData] =
    useState<Array<Array<string>>>(tableData);

  // Function to include only the rows o tableData where at least one cell contains the search query string, without case-sensitivity

  const filteredData = tableData.filter((rowData) =>
    rowData.some((cellData) =>
      cellData.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const startIndex = (currentPage - 1) * entries_per_page;
  const endIndex = Math.min(startIndex + entries_per_page, filteredData.length);

  useEffect(() => {
    const totalPages = Math.ceil(tableData.length / entries_per_page);
    const currentPageData = filteredData.slice(startIndex, endIndex);

    setTotalPages(totalPages);
    setCurrentPageData(currentPageData);
  }, [filteredData]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSaveButtonClick = (index: number) => {
    const actualIndex = startIndex + index; // calculate the actual index of the row in the editedValues array

    const editedLastName = editedValues[actualIndex][0];
    const editedFirstName = editedValues[actualIndex][1];
    const roleStatus = editedValues[actualIndex][2];
    const editedTeam = editedValues[actualIndex][3];
    const editedEmail = editedValues[actualIndex][4];
    const userId = userData[actualIndex].userId;

    tableDataMutation.mutate({
      id: userId,
      lastName: editedLastName,
      firstName: editedFirstName,
      role: roleStatus,
      teamName: editedTeam,
      email: editedEmail,
    });
    console.log("Save button clicked");

    toggleEditMode(index);
  };

  const toggleEditMode = (index: number) => {
    const actualIndex = startIndex + index;

    const newEditModes = [...editModes];
    newEditModes[actualIndex] = !newEditModes[actualIndex];
    setEditModes(newEditModes);
  };

  const handleInputChange = (
    value: string,
    rowIndex: number,
    cellIndex: number,
  ) => {
    const actualIndex = startIndex + rowIndex; // calculate the actual index of the row in the editedValues array

    const newEditedValues = [...editedValues]; // create a copy of the editedValues array
    newEditedValues[actualIndex][cellIndex] = value; // update the value of the specific cell in the specific row
    setEditedValues(newEditedValues); // set the editedValues state to the new array
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteButton = async (recordId: string) => {
    setShowDeletePopup(true);
    setRecordToDeleteId(recordId);
  };

  return (
    <div className="flex justify-center">
      <div className={DATA_TABLE_SECTION_STYLES}>
        {/* search results bar */}
        <div className={SEARCH_RESULTS_SECTION_STYLES}>
          <h1 className={SEARCH_RESULTS_TEXT_STYLES}>
            Search Results (
            {searchQuery === "" ? tableData.length : filteredData.length}{" "}
            {searchQuery === ""
              ? tableData.length === 1
                ? "record"
                : "records"
              : "records"}{" "}
            found)
          </h1>
          <input
            type="text"
            placeholder="Search name"
            className={SEARCH_BAR_STYLES}
            onChange={handleSearchChange}
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
              <tr className="text-white">
                {/* Corrected mapping with return statement */}
                {tableHeaders.map((header, index) => (
                  <th
                    className={`${DATA_TABLE_HEADER_CELL_STYLES} ${header.className}`}
                    key={index}
                  >
                    {header.columnHeader}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-light-grey"}`}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <td className={DATA_TABLE_CELL_STYLES} key={cellIndex}>
                      {/* LAST NAME*/}
                      {editModes[startIndex + rowIndex] ? (
                        cellIndex === 0 ? (
                          <input
                            type="text"
                            value={
                              editedValues[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        ) : cellIndex === 1 ? ( //FIRST NAME
                          <input
                            type="text"
                            value={
                              editedValues[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        ) : cellIndex === 2 ? ( //ROLE
                          <select
                            value={
                              editedValues[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          >
                            <option value="Admin">Admin</option>
                            <option value="Judge">Judge</option>
                            <option value="Participant">Participant</option>
                          </select>
                        ) : cellIndex === 3 ? ( //TEAM
                          <input
                            type="text"
                            value={
                              editedValues[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        ) : cellIndex === 4 ? ( //EMAIL
                          <input
                            type="text"
                            value={
                              editedValues[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                rowIndex,
                                cellIndex,
                              )
                            }
                          />
                        ) : (
                          cellData
                        )
                      ) : (
                        cellData
                      )}
                    </td>
                  ))}
                  <td className="min-w-[250px] p-3 text-center">
                    {editModes[startIndex + rowIndex] ? (
                      <>
                        <button
                          className={EDIT_BUTTON_STYLES}
                          onClick={() => handleSaveButtonClick(rowIndex)}
                        >
                          Save
                        </button>
                        <button
                          className="text-dark-pink"
                          onClick={() => toggleEditMode(rowIndex)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={EDIT_BUTTON_STYLES}
                          onClick={() => toggleEditMode(rowIndex)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-dark-pink"
                          onClick={() =>
                            handleDeleteButton(
                              userData[startIndex + rowIndex].userId,
                            )
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
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
          {/* popup component to confirm deletion of record */}
          {showDeletePopup && (
            <PopupUser
              selectedMembersData={[]}
              selectedMemberStatus={[]}
              teamName=""
              popupType="delete"
              recordToDelete={recordToDeleteId}
              onClose={() => setShowDeletePopup(false)}
            />
          )}
          {/* pagination */}
          <div className="my-4 flex items-center justify-between">
            {/* replace dynamically */}
            <h2 className="text-lg">
              Showing {currentPage} of {totalPages} of {tableData.length}{" "}
              entries
            </h2>
            <div className="flex text-sm text-awesomer-purple">
              <p className={CHANGE_PAGE_BUTTON_TEXT_STYLING}>Previous</p>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={CHANGE_PAGE_BUTTON_STYLING}
              >
                &lt;
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={CHANGE_PAGE_BUTTON_STYLING}
              >
                &gt;
              </button>
              <p className={CHANGE_PAGE_BUTTON_TEXT_STYLING}>Next</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableSectionUser;
