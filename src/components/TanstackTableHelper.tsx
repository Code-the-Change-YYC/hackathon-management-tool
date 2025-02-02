import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ColumnDef,
  FilterFn,
  PaginationState,
  RowData,
  SortingState,
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
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};
export default function tanstackTableHelper<
  T extends M & MP & UP,
  M,
  MP extends object,
  DR,
  UP,
>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  setData,
  deleteElement,
  typeName,
  updateElement,
}: {
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  columns: ColumnDef<T, any>[];
  deleteElement?: (id: MP) => Promise<{
    data: DR;
    errors?: any[];
    extensions?: {
      [key: string]: any;
    };
  }>;
  updateElement?: (updatedElement: UP) => Promise<{
    data: DR;
    errors?: any[];
    extensions?: {
      [key: string]: any;
    };
  }>;
  typeName: string;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const queryClient = useQueryClient();
  let deleteMutation = null;
  if (deleteElement) {
    deleteMutation = useMutation({
      mutationKey: [typeName],
      mutationFn: async ({ rowIndex, id }: { rowIndex: number; id: MP }) => {
        const prev = data;
        setData((old) => old.filter((_, index) => index !== rowIndex));
        try {
          const response = await deleteElement(id);
          if (response.errors) {
            throw new Error(response.errors[0].message);
          }
        } catch (error) {
          setData(prev);
          throw error;
        }
        return id;
      },
      onError: (error) => {
        toast.error(`Error deleting ${typeName}: ${error.message}`);
      },
      onSuccess: (element) => {
        queryClient.invalidateQueries({ queryKey: [typeName] });
        if (!("id" in element)) return;
        toast.success(`${typeName} ${element.id!} deleted succesfully`);
      },
    });
  }
  let updateMutation = null;
  if (updateElement) {
    updateMutation = useMutation({
      mutationKey: [typeName],
      mutationFn: async (updatedData: UP) => {
        try {
          const response = await updateElement(updatedData);
          if (response.errors) {
            throw new Error(response.errors[0].message);
          }
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [typeName] });
        toast.success(`${typeName} data updated succesfully`);
      },
      onError: () => {
        toast.error(`Error updating ${typeName}`);
      },
    });
  }
  const table = useReactTable({
    data,
    columns,
    // onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    // globalFilterFn: "fuzzy",
    // state: {
    //   pagination,
    //   globalFilter,
    //   sorting,
    // },
    // autoResetPageIndex: false,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index !== rowIndex) return row;
            return {
              ...old[rowIndex]!,
              [columnId]: value,
            };
          }),
        );
      },
      deleteData: (element, rowIndex) => {
        deleteMutation?.mutate({ id: element, rowIndex });
      },
      saveData: (data) => updateMutation?.mutate(data),
    },
  });
  return table;
}
