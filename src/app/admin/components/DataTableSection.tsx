import Image from "next/image";
import { useEffect, useState } from "react";

import Popup from "@/app/admin/components/PopupTile";

const search_icon = "/svgs/admin/search_icon.svg";

const entries_per_page = 10;

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
  teamData?: Array<any>;
  tableDataMutation: any;
}

const DataTableSection = (props: DataTableProps) => {
  const {
    tableData,
    tableHeaders,
    showViewButton = false,
    teamData = [],
    tableDataMutation,
  } = props;

  const [editModes, setEditModes] = useState(
    Array(tableData.length).fill(false),
  );
  const [editedValues, setEditedValues] = useState<string[][]>([]);

  useEffect(() => {
    if (tableData.length > 0) {
      const formattedEditedValues = tableData.map((rowData) => [...rowData]);
      setEditedValues(formattedEditedValues);
    }
  }, [tableData]);

  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState("");
  const [selectedMembersData, setSelectedMembersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedMemberStatus, setSelectedMemberStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableData.length / entries_per_page);
  const startIndex = (currentPage - 1) * entries_per_page;
  const endIndex = Math.min(startIndex + entries_per_page, tableData.length);
  const currentPageData = tableData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleViewButtonClick = (rowData: Array<string>) => {
    const teamName = rowData[0];
    const team = teamData.find((team) => team.teamName === teamName);

    if (team) {
      const { members, membersStatus } = team;
      setSelectedMembersData(members);
      setSelectedTeamName(teamName);
      setSelectedMemberStatus(membersStatus);
      setShowViewPopup(true);
    }
  };

  // ONLY WORKS FOR TEAM DATA
  const handleSaveButtonClick = (index: number) => {
    const editedTeamName = editedValues[index][0];
    const teamId = teamData[index].teamId;

    tableDataMutation.mutate({ id: teamId, name: editedTeamName });

    toggleEditMode(index);
  };

  const toggleEditMode = (index: number) => {
    const newEditModes = [...editModes];
    newEditModes[index] = !newEditModes[index];
    setEditModes(newEditModes);
  };

  const handleInputChange = (
    value: string,
    rowIndex: number,
    cellIndex: number,
  ) => {
    const newEditedValues = [...editedValues];
    newEditedValues[rowIndex][cellIndex] = value;
    setEditedValues(newEditedValues);
  };

  const filteredData = currentPageData.filter((rowData) =>
    rowData.some((cellData) =>
      cellData.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

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
            Search Results ({filteredData.length}{" "}
            {filteredData.length === 1 ? "record" : "records"} found)
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
        <div className="overflow-x-auto">
          <table className={DATA_TABLE_CONTENT_STYLES}>
            <thead className="bg-dark-grey">
              <tr className="bg-awesome-purple text-white">
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
              {filteredData.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-light-grey"}`}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <td className={DATA_TABLE_CELL_STYLES} key={cellIndex}>
                      {/* ONLY FOR TEAMS DATA */}
                      {editModes[rowIndex] && cellIndex === 0 ? (
                        <input
                          type="text"
                          value={editedValues[rowIndex][0]}
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
                      )}
                    </td>
                  ))}
                  <td className="min-w-[250px] p-3 text-center">
                    {editModes[rowIndex] ? (
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
                        {/* ONLY FOR TEAMS DATA */}
                        {showViewButton && (
                          <button
                            className="mr-6 text-awesome-purple"
                            onClick={() => handleViewButtonClick(rowData)}
                          >
                            View
                          </button>
                        )}
                        <button
                          className="text-dark-pink"
                          onClick={() =>
                            handleDeleteButton(teamData[rowIndex].teamId)
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
        </div>
        {/* popup component for teams table ONLY */}
        {showViewPopup && (
          <Popup
            selectedMembersData={selectedMembersData}
            selectedMemberStatus={selectedMemberStatus}
            teamName={selectedTeamName}
            popupType="view"
            recordToDelete=""
            onClose={() => setShowViewPopup(false)}
          />
        )}
        {/* popup component to confirm deletion of record */}
        {showDeletePopup && (
          <Popup
            selectedMembersData={[]}
            selectedMemberStatus={[]}
            teamName=""
            popupType="delete"
            recordToDelete={recordToDeleteId}
            onClose={() => setShowDeletePopup(false)}
          />
        )}
        <div className="my-4 flex items-center justify-between">
          {/* replace dynamically */}
          <h2 className="text-lg">
            Showing {currentPage} of {totalPages} of {tableData.length} entries
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
  );
};

export default DataTableSection;
