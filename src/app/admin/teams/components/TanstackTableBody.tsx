import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export default function TanstackTableBody<T>({ table }: { table: Table<T> }) {
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
