"use client";

import {
  flexRender,
  getFilteredRowModel,
  PaginationState,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  Updater,
  FilterFn,
} from "@tanstack/react-table";
import { useState } from "react";
import FilterBar, { SearchBg } from "./FilterBar";
import { Filter } from "@/types/filter";
import ContextMenu from "../ContextMenu";
import { RowSelectionHandlerMethod } from "@/utils/auxiliary/rowSelectionHandler";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useTableFilter } from "@/store/tableFilterSlice";
import { TableStateName, useTableFacets } from "@/store/tableFacetsSlice";
import { useTablePagination } from "@/store/tablePaginationSlice";

type DataTableDefaultProps = {
  data: any;
  columns: any;
  actionButtonTitle?: string;
  filters?: Filter[] | null;
  dialogIdentifier?: string;
  linkPath?: string;
  onRowClick: (row: any, method: RowSelectionHandlerMethod) => void;
  onEnter?: (row: any) => any;
  initialSortBy?: { id: string, desc: boolean }[];
  tableStateName: TableStateName;
  disableFilters?: boolean
  disablePagination?: boolean
  searchBg?: SearchBg
  initialColumnFilters?: ColumnFiltersState;
};

const globalFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const search = String(filterValue).toLowerCase();

  const searchInObject = (obj: any): boolean => {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (Array.isArray(obj)) {
      return obj.some(searchInObject);
    }

    if (typeof obj === 'object') {
      return Object.values(obj).some(searchInObject);
    }

    return String(obj).toLowerCase().includes(search);
  };

  return searchInObject(row.original);
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
  initialSortBy,
  tableStateName,
  disableFilters = false,
  disablePagination = false,
  searchBg,
  initialColumnFilters,
}: DataTableDefaultProps) => {

  const tableFilterState = useTableFilter();
  const tableFacetsState = useTableFacets();
  const tablePaginationSlice = useTablePagination();

  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>(initialSortBy || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters || tableFacetsState[tableStateName] || []);
  const [globalFilter, setGlobalFilter] = useState(tableFilterState[tableStateName] ?? "");
  const [pagination, setPagination] = useState<PaginationState>(tablePaginationSlice[tableStateName] || { pageIndex: 0, pageSize: 10 });

  const handlePaginationChange = (updater: Updater<PaginationState>) => {

    const newValue =
      updater instanceof Function ? updater(pagination) : updater;
    setPagination(newValue);

    tablePaginationSlice.setPagination(tableStateName, newValue);
  };

  const table = useReactTable({
    data,
    columns,
    initialState: {
      sorting: initialSortBy || [],
    },
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    enableRowSelection: true,
    enableGlobalFilter: true,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: handlePaginationChange,
    globalFilterFn,
  });

  return (
    <div className="flex flex-col gap-y-6">
      {!disableFilters && <FilterBar
        table={table}
        filters={filters}
        actionButtonTitle={actionButtonTitle}
        dialogIdentifier={dialogIdentifier}
        linkPath={linkPath}
        onEnter={onEnter}
        tableStateName={tableStateName}
        searchBg={searchBg}
      />}
      <div className="w-full">
        <table className="min-w-full text-left text-lg font-light">
          <thead className="border-b font-medium border-accent/35 text-base-content">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="px-2" key={headerGroup.id}>
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
                    className="border-b border-accent/35 hover:bg-accent/25 hover:cursor-pointer hover:text-accent-content"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="py-4 px-2 text-base-content" key={cell.id}>
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
                  >
                    New Tab
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            ))}
          </tbody>
        </table>
        {!disablePagination && <div className="flex flex-row justify-between mt-6">
          <div>
            <span className="flex text-base-content font-inter font-semibold items-center gap-1">
              Jump To Page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border border-accent/35 bg-base-100 p-2 rounded w-16"
              />
            </span>
          </div>

          <div className="flex gap-x-4 text-3xl">
            <button
              className="py-1 px-2 rounded-lg text-2xl text-accent-content bg-accent/35 disabled:opacity-40 font-inter font-semibold hover:bg-accent"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <FiChevronsLeft />
            </button>
            <button
              className="py-1 px-2 rounded-lg text-2xl text-accent-content bg-accent/35  disabled:opacity-40 font-inter font-semibold hover:bg-accent"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <FiChevronLeft />
            </button>
            <span className="flex items-center gap-1 font-inter font-semibold text-base-content text-base">
              <div>Page</div>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </span>
            <button
              className="py-1 px-2 rounded-lg text-2xl text-base-content bg-accent/35 disabled:opacity-40 font-inter font-semibold hover:bg-accent"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <FiChevronRight />
            </button>
            <button
              className="py-1 px-2 rounded-lg text-2xl  text-base-content bg-accent/35 disabled:opacity-40 font-inter font-semibold hover:bg-accent"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <FiChevronsRight />
            </button>
          </div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
            className="bg-accent/35 hover:bg-accent/15 rounded-lg px-2 py-1 font-inter text-base text-accent-content font-semibold w-32"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize} className="font-inter text-base text-base-content font-semibold">
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>}
        <div className="flex items-center gap-2 mt-4"></div>
      </div>
    </div>
  );
};

export default Default;
