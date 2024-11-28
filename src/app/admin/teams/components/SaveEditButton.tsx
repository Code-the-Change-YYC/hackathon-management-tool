import type { Row, TableMeta } from "@tanstack/react-table";

import type { Team } from "../tanstackTableSetup";

export default function SaveEditButton({
  row,
  meta,
}: {
  row: Row<Team>;
  meta?: TableMeta<Team>;
}) {
  return (
    <button
      className=" text-awesomer-purple"
      onClick={() => {
        row.toggleSelected(!row.getIsSelected());
        if (!row.getIsSelected()) return;
        meta?.saveData(row.original);
      }}
    >
      {row.getIsSelected() ? "Save" : "Edit"}
    </button>
  );
}
