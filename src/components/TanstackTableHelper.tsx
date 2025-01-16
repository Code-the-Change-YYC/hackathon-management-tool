import { useState } from "react";

import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem } from "@tanstack/match-sorter-utils";
import type {
  FilterFn,
  PaginationState,
  RowData,
  TableMeta,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: keyof TData,
      value: TData[keyof TData],
    ) => void;
    saveData: (data: TData) => void;
    deleteData: (data: TData, rowIndex: number) => void;
  }
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
export default function tanstackTableHelper<T>({
  data,
  columnData,
  meta,
  globalFilter,
  setGlobalFilter,
}: {
  data: T[];
  columnData: any;
  meta: TableMeta<T>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  const table = useReactTable({
    data,
    columns: columnData,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    state: {
      pagination,
      globalFilter,
    },
    autoResetPageIndex: false,
    meta,
  });
  return table;
}
