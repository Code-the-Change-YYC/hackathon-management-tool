import { memo } from "react";

import type { HeaderGroup } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

const TeamsTableHead = ({ table }: { table: HeaderGroup<any>[] }) => {
  return (
    <thead className=" bg-awesome-purple text-white">
      {table.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th className="p-4 text-start font-light" key={header.id}>
              {header.isPlaceholder ? null : (
                <div
                  className={
                    header.column.getCanSort()
                      ? "flex cursor-pointer select-none gap-2"
                      : ""
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string]
                  }
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
export default memo(TeamsTableHead);
