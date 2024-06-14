import Image from "next/image";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { type Schema } from "@/amplify/data/resource";
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
const DATA_TABLE_HEADER_CELL_STYLES =
  "p-3 font-normal text-xl bg-[#A689FF] flex justify-center items-center";
const DATA_TABLE_CELL_STYLES =
  "p-3 py-4 text-md font-light overflow-x-auto flex items-center justify-start";

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
  tableHeaders: Array<{ columnHeader: string }>;
  userData?: Array<any>;
  tableDataMutation: any;
}

const DataTableSectionUser = (props: DataTableProps) => {
  const { register, handleSubmit } = useForm<Schema["User"]["type"]>();

  const onSubmit: SubmitHandler<Schema["User"]["type"]> = (data) => {
    const actualIndex = startIndex + index; // calculate the actual index
    const userId = userData[actualIndex].userId;
    data.id = userId;
    tableDataMutation.mutate(data);
    console.log(data);
  };

  const { tableData, tableHeaders, userData = [], tableDataMutation } = props;

  const [editModes, setEditModes] = useState(
    Array(tableData.length).fill(false),
  );

  const [index, setIndex] = useState(0);
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
    const currentPageData = filteredData
      .slice(startIndex, endIndex)
      .map((rowData) => rowData.slice(0, -1));

    setTotalPages(totalPages);
    setCurrentPageData(currentPageData);
  }, [tableData]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSaveButtonClick = (index: number) => {
    toggleEditMode(index);
  };

  const toggleEditMode = (index: number) => {
    setIndex(index);
    const actualIndex = startIndex + index;

    const newEditModes = [...editModes];
    newEditModes[actualIndex] = !newEditModes[actualIndex];
    setEditModes(newEditModes);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteButton = async (index: number) => {
    const actualIndex = startIndex + index; // calculate the actual index
    const userId = userData[actualIndex].userId;
    setShowDeletePopup(true);
    setRecordToDeleteId(userId);
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
        <div className={`${DATA_TABLE_CONTENT_STYLES} flex flex-col`}>
          <div className="flex w-full flex-row text-white">
            {tableHeaders.map((header, index) => (
              <div
                key={index}
                className={`${DATA_TABLE_HEADER_CELL_STYLES} ${index === 0 ? "w-1/6" : index === 1 ? "w-1/6" : index === 2 ? "w-1/6" : index === 3 ? "w-1/6" : index === 4 ? "w-2/5" : "w-1/4"} border-r border-gray-300 `}
              >
                {header.columnHeader}
              </div>
            ))}
          </div>
          <div className="">
            {currentPageData.map((rowData, rowIndex) => (
              <form key={rowIndex} onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`flex flex-row ${rowIndex % 2 === 0 ? "bg-white" : "bg-light-grey"}`}
                  role="row"
                >
                  {rowData.map((cellData, cellIndex) => (
                    <div
                      className={`${DATA_TABLE_CELL_STYLES}  ${cellIndex === 0 ? "w-1/6" : cellIndex === 1 ? "w-1/6" : cellIndex === 2 ? "w-1/6" : cellIndex === 3 ? "w-1/6" : cellIndex === 4 ? "w-2/5" : "w-1/6"} border-r border-gray-300`}
                      key={cellIndex}
                      role="col"
                    >
                      {editModes[startIndex + rowIndex] ? (
                        cellIndex === 0 ? (
                          <input
                            type="text"
                            defaultValue={
                              tableData[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            {...register("lastName")}
                            key={cellIndex}
                          />
                        ) : cellIndex === 1 ? (
                          <input
                            type="text"
                            defaultValue={
                              tableData[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            {...register("firstName")}
                            key={cellIndex}
                          />
                        ) : cellIndex === 2 ? (
                          <select
                            defaultValue={
                              tableData[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            {...register("role")}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Judge">Judge</option>
                            <option value="Participant">Participant</option>
                          </select>
                        ) : cellIndex === 3 ? (
                          <input
                            type="text"
                            defaultValue={
                              tableData[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                            {...register("team")}
                          />
                        ) : cellIndex === 4 ? (
                          <input
                            type="text"
                            defaultValue={
                              tableData[startIndex + rowIndex][cellIndex]
                            }
                            className={EDIT_MODE_TEXT_INPUT_STYLES}
                          />
                        ) : (
                          cellData
                        )
                      ) : (
                        cellData
                      )}
                    </div>
                  ))}
                  <div className="w-1/4 p-3 text-center">
                    {editModes[startIndex + rowIndex] ? (
                      <>
                        <button
                          className={EDIT_BUTTON_STYLES}
                          type="submit"
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
                          onClick={(e) => {
                            e.preventDefault();
                            toggleEditMode(rowIndex);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-dark-pink"
                          onClick={() => handleDeleteButton(rowIndex)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            ))}
            <div role="row" className="h-10 bg-awesome-purple">
              {Array(tableHeaders.length + 1)
                .fill(null)
                .map((_, index) => (
                  <div key={index}></div>
                ))}
            </div>
          </div>

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
