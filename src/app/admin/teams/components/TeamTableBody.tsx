import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import type { Team } from "../tanstackTableSetup";

export default function TeamTableBody({ table }: { table: Table<Team> }) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="w-full odd:bg-light-grey">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="p-4">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
