import type { Row, TableMeta } from "@tanstack/react-table";

export default function SaveEditButton<T>({
  row,
  meta,
}: {
  row: Row<T>;
  meta?: TableMeta<T>;
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
