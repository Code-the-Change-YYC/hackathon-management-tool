import type { Table } from "@tanstack/react-table";

export default function TanstackTableFooter<T>({ table }: { table: Table<T> }) {
  return (
    <div className="text-md mb-2 flex items-center justify-between px-3 text-awesomer-purple group-[.teams]:gap-2.5 group-[.users]:gap-7 group-[.users]:whitespace-nowrap group-[.teams]:md:gap-4 group-[.users]:md:gap-11">
      <div className="text-black">
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {table.getRowCount().toLocaleString()} Rows
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-12 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="flex size-8 items-center justify-center rounded border border-awesome-purple bg-slate-300 transition-all hover:border-awesomer-purple"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="flex size-8 items-center justify-center rounded border border-awesome-purple bg-slate-300 transition-all hover:border-awesomer-purple"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="mr-3 rounded border p-1 md:mr-0"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
