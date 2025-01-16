import { useState } from "react";

import type { Row, TableMeta } from "@tanstack/react-table";

import Modal from "./Modal";

export default function DeleteButton<T extends Record<string, any>>({
  row,
  meta,
}: {
  row: Row<T>;
  meta?: TableMeta<T>;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const header =
    row.original.teamName ??
    `${row.original.firstName} ${row.original.lastName}`;
  const id = `- #${row.original.teamID ?? row.original.id}`;
  return (
    <>
      <button className=" text-dark-pink" onClick={() => setShowPopup(true)}>
        Delete
      </button>
      {showPopup && (
        <Modal onClose={() => setShowPopup(false)}>
          <h1 className="text-3xl font-semibold">
            {header}
            {id}
          </h1>
          <div className="flex flex-col gap-2 bg-light-grey p-2">
            <h1 className="text-xl font-bold">
              Are you sure you want to delete this record?
            </h1>
            <h2 className="mb-2">
              This record will be deleted{" "}
              <i>
                <b>permanently</b>
              </i>
              . You cannot undo this action.
            </h2>
            <div className="flex justify-end gap-2">
              <button
                className=" rounded-md border border-black p-2 px-6 hover:opacity-40"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md border bg-dark-pink p-2 px-6 text-white transition-all hover:bg-pastel-pink"
                onClick={() => {
                  meta?.deleteData(row.original, row.index);
                  setShowPopup(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
