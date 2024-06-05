"use client";

import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
  FilterFn,
  Row,
} from "@tanstack/react-table";
import { useState } from "react";
import FilterBar from "./FilterBar";
import { Filter } from "@/types/filter";
import ContextMenu from "../ContextMenu";

type DataTableDefaultProps = {
  data: any;
  columns: any;
  actionButtonTitle?: string;
  filters?: Filter[] | null;
  dialogIdentifier?: string;
  linkPath?: string;
  onRowClick: (row: any, method: string) => void;
  onEnter?: (row: any) => any;
};

const Default = ({
  data,
  columns,
  actionButtonTitle,
  filters,
  onRowClick,
  dialogIdentifier,
  linkPath,
  onEnter,
}: DataTableDefaultProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      sorting,
      columnFilters,
      globalFilter,
    },
    // filterFns: {
    //   meetmeet: myCustomFilterFn, // basically make an alias for our custom filter
    // },
    enableRowSelection: true,
    enableGlobalFilter: true,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    // globalFilterFn: "meetmeet", // use our custom filter by accessing it via the alias
  });

  return (
    <div className="flex flex-col gap-y-6">
      <FilterBar
        table={table}
        filters={filters}
        actionButtonTitle={actionButtonTitle}
        dialogIdentifier={dialogIdentifier}
        linkPath={linkPath}
        onEnter={onEnter}
      />
      <div className="w-full">
        <table className="min-w-full text-left text-lg font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <ContextMenu.Root key={row.id}>
                <ContextMenu.Trigger asChild>
                  <tr
                    onClick={() => onRowClick(row, 'rowClick')}
                    className="border-b dark:border-neutral-500"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="py-4" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item
                    onClick={() => onRowClick(row, 'newTab')}
                    // shortcut={"CTRL + A"}
                  >
                    New Tab
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Default;
