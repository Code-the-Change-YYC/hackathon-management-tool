"use client";

import { generateClient } from "aws-amplify/data";
import Image from "next/image";

import { type Schema } from "@/amplify/data/resource";
import { useMutation } from "@tanstack/react-query";

const exit_icon = "/svgs/admin/exit_icon.svg";

const VIEW_TEAM_POPUP_SECTION_STYLES =
  "fixed left-0 top-0 flex size-full items-center justify-center bg-black/60";
const VIEW_TEAM_POPUP_TILE_STYLES =
  "w-4/5 max-w-[1200px] rounded-md bg-white p-6";

const VIEW_TEAM_POPUP_HEADER_STYLES = "mb-4 flex justify-between";

const VIEW_TEAM_POPUP_TABLE_SECTION_STYLES =
  "rounded-md borderborder-awesomer-purple bg-light-grey p-2";
const VIEW_TEAM_POPUP_TABLE_CONTENT_STYLES =
  "w-full border-separate border-spacing-2 text-left";
const VIEW_TEAM_POPUP_TABLE_HEADER_STYLES = "bg-awesome-purple text-white";
const VIEW_TEAM_POPUP_TABLE_CELL_STYLES = "rounded-md p-2";

const DELETE_RECORD_POPUP_TILE_STYLES = "w-2/5 bg-white p-8 rounded-md ";

interface PopupProps {
  selectedMembersData: string[];
  selectedMemberStatus: string | string[];
  popupType: string;
  teamName: string;
  recordToDelete: string;
  onClose: () => void;
}

const client = generateClient<Schema>();

const PopupUser = ({
  selectedMembersData,
  selectedMemberStatus,
  popupType,
  onClose,
  recordToDelete,
  teamName,
}: PopupProps) => {
  const deleteRecord = useMutation({
    mutationFn: async (recordId: string) =>
      await client.models.User.delete({ id: recordId }),
    onError: (error) => {
      console.log("Error deleting record:", error);
    },
    onSuccess: () => {
      onClose();
    },
  });

  const handleDelete = async () => {
    try {
      await deleteRecord.mutateAsync(recordToDelete);
    } catch (error) {
      // onError callback will handle the error
    }
  };

  return (
    <div className={VIEW_TEAM_POPUP_SECTION_STYLES}>
      {popupType === "view" ? (
        <div className={VIEW_TEAM_POPUP_TILE_STYLES}>
          <div className={VIEW_TEAM_POPUP_HEADER_STYLES}>
            <h1 className="text-3xl font-semibold">{teamName}&apos;s Team</h1>
            <button className="mr-2" onClick={onClose}>
              <Image
                src={exit_icon}
                alt="Exit page icon"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className={VIEW_TEAM_POPUP_TABLE_SECTION_STYLES}>
            <table className={VIEW_TEAM_POPUP_TABLE_CONTENT_STYLES}>
              <thead>
                <tr className={VIEW_TEAM_POPUP_TABLE_HEADER_STYLES}>
                  <th className="w-1/2 rounded-md p-2">Members</th>
                  <th className={VIEW_TEAM_POPUP_TABLE_CELL_STYLES}>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedMembersData.map((member, index) => (
                  <tr className="bg-white" key={member}>
                    <td className={VIEW_TEAM_POPUP_TABLE_CELL_STYLES}>
                      {member}
                    </td>
                    <td className={VIEW_TEAM_POPUP_TABLE_CELL_STYLES}>
                      {selectedMemberStatus[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={DELETE_RECORD_POPUP_TILE_STYLES}>
          <div className="flex items-start justify-between">
            <h1 className="mb-4 text-2xl font-bold">
              Are you sure you want to delete this record?
            </h1>
            <button onClick={onClose}>
              <Image
                src={exit_icon}
                alt="Exit page icon"
                width={15}
                height={15}
                className="mt-2"
              />
            </button>
          </div>
          <p className="mb-8">
            This record will be deleted{" "}
            <i>
              <b>permanently</b>
            </i>
            . You cannot undo this action.
          </p>
          <div className="flex justify-end">
            <button
              className="mr-4 rounded-md border border-black p-2 px-6 hover:opacity-40"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-md border bg-dark-pink p-2 px-6 text-white hover:bg-pastel-pink"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupUser;
