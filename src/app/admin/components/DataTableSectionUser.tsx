import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

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
  "p-3 py-4 text-md font-light overflow-x-auto flex items-center justify-start border-r border-gray-300";

const EDIT_BUTTON_STYLES = "mr-6 text-awesomer-purple";
const EDIT_MODE_TEXT_INPUT_STYLES =
  "w-full rounded-md border border-awesomer-purple bg-white p-2 focus:outline-none focus:ring-1 focus:ring-awesomer-purple";
const CHANGE_PAGE_BUTTON_STYLING =
  "rounded-md border border-awesomer-purple bg-white px-6 hover:bg-awesomer-purple hover:text-white";
const CHANGE_PAGE_BUTTON_TEXT_STYLING = "rounded-md bg-white p-2 px-8";

const search_icon = "/svgs/admin/search_icon.svg";

const entries_per_page = 10;

interface DataTableProps {
  tableHeaders: Array<{ columnHeader: string }>;
  userData: Array<Partial<Schema["User"]["type"]>>;
  tableDataMutation: any;
}

const DataTableSectionUser = (props: DataTableProps) => {
  const { control, handleSubmit } = useForm<Schema["User"]["type"]>();

  const onSubmit: SubmitHandler<Schema["User"]["type"]> = (data) => {
    setEditingId("");
    const strippedObject = userData.find((user) => user.email === data.email);
    console.log(data);
    if (strippedObject) {
      data.id = strippedObject.id ?? "";
      tableDataMutation.mutate(data);
      console.log(data);
    } else {
      console.error("User not found");
      toast.error("❌ User cannot be found", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const { tableHeaders, userData = [], tableDataMutation } = props;

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState(
    "" as string | undefined,
  );
  const [editingId, setEditingId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageData, setCurrentPageData] =
    useState<Array<Partial<Schema["User"]["type"]>>>(userData);

  const filteredData = useMemo(() => {
    return userData.filter((rowData) =>
      Object.values(rowData).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [userData, searchQuery]);
  const startIndex = (currentPage - 1) * entries_per_page;
  const endIndex = Math.min(startIndex + entries_per_page, filteredData.length);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / entries_per_page);
    const currentPageData = filteredData.slice(startIndex, endIndex);
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // .map(({ id, ...allOtherFields }) => allOtherFields);

    setTotalPages(totalPages);
    setCurrentPageData(currentPageData);
  }, [filteredData, currentPage, entries_per_page]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const toggleEditMode = (rowId: string) => {
    console.log(rowId);
    console.log(editingId);
    if (rowId === undefined) {
      toast.error("❌ An error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
      });
    } else if (rowId === editingId) {
      setEditingId("");
    } else {
      setEditingId(rowId);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteButton = async (index: number) => {
    const actualIndex = startIndex + index; // calculate the actual index
    const userId = userData[actualIndex].id;
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
            {searchQuery === "" ? userData.length : filteredData.length}{" "}
            {searchQuery === ""
              ? userData.length === 1
                ? "record"
                : "records"
              : "records"}{" "}
            found)
          </h1>
          <input
            type="text"
            placeholder="Search id, name, email..."
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

          {currentPageData.map((rowData, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex w-full flex-row ${rowIndex % 2 === 0 ? "bg-white" : "bg-light-grey"}`}
            >
              {editingId === rowData.id ? (
                <>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-md flex items-center justify-start overflow-x-auto border-r border-gray-300 font-light"
                  >
                    <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                      <Controller
                        key={rowData.id}
                        name="lastName"
                        control={control}
                        defaultValue={rowData.lastName}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`${EDIT_MODE_TEXT_INPUT_STYLES}`}
                          />
                        )}
                      />
                    </div>
                    <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                      <Controller
                        key={rowData.id}
                        name="firstName"
                        control={control}
                        defaultValue={rowData.firstName}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`${EDIT_MODE_TEXT_INPUT_STYLES}`}
                          />
                        )}
                      />
                    </div>
                    <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                      <Controller
                        key={rowData.id}
                        name="role"
                        control={control}
                        defaultValue={rowData.role}
                        render={({ field }) => (
                          <select
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`${EDIT_MODE_TEXT_INPUT_STYLES}`}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Judge">Judge</option>
                            <option value="Participant">Participant</option>
                          </select>
                        )}
                      />
                    </div>
                    <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                      <Controller
                        key={rowData.id}
                        name="teamId"
                        control={control}
                        defaultValue={rowData.teamId}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`${EDIT_MODE_TEXT_INPUT_STYLES}`}
                          />
                        )}
                      />
                    </div>
                    <div className={`${DATA_TABLE_CELL_STYLES} w-2/5`}>
                      <Controller
                        key={rowData.id}
                        name="email"
                        control={control}
                        defaultValue={rowData.email}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full"
                          />
                        )}
                      />
                    </div>

                    <div className={`${DATA_TABLE_CELL_STYLES} w-1/4`}>
                      <button className={EDIT_BUTTON_STYLES} type="submit">
                        Save
                      </button>
                      <button
                        className="text-dark-pink"
                        onClick={() => toggleEditMode(rowData.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex w-full">
                  <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                    {rowData.lastName}
                  </div>
                  <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                    {rowData.firstName}
                  </div>
                  <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                    {rowData.role}
                  </div>
                  <div className={`${DATA_TABLE_CELL_STYLES} w-1/6`}>
                    {rowData.teamId}
                  </div>
                  <div className={`${DATA_TABLE_CELL_STYLES} w-2/5`}>
                    {rowData.email}
                  </div>
                  <div className={`${DATA_TABLE_CELL_STYLES} w-1/4`}>
                    {" "}
                    <button
                      className={EDIT_BUTTON_STYLES}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleEditMode(rowData.id);
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
                  </div>
                </div>
              )}
            </div>
          ))}
          <div role="row" className="h-10 bg-awesome-purple">
            {Array(tableHeaders.length + 1)
              .fill(null)
              .map((_, index) => (
                <div key={index}></div>
              ))}
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
              Showing {currentPage} of {totalPages} of {userData.length} entries
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
