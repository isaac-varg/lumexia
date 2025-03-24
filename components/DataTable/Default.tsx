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
} from "@tanstack/react-table";
import { useState } from "react";
import FilterBar from "./FilterBar";
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
}: DataTableDefaultProps) => {

    const tableFilterState = useTableFilter();
    const tableFacetsState = useTableFacets();
    const tablePaginationSlice = useTablePagination();

    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>(initialSortBy || []);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(tableFacetsState[tableStateName]);
    const [globalFilter, setGlobalFilter] = useState(tableFilterState[tableStateName] ?? "");
    const [pagination, setPagination] = useState<PaginationState>(tablePaginationSlice[tableStateName]);

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
            />}
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
                                        className="border-b dark:border-neutral-500 hover:bg-bay-leaf-100"
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
                        <span className="flex text-neutral-700 font-inter font-semibold items-center gap-1">
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
                                className="border border-cararra-100 bg-cararra-100 p-2 rounded w-16"
                            />
                        </span>
                    </div>

                    <div className="flex gap-x-4 text-3xl">
                        <button
                            className="py-1 px-2 rounded-lg text-2xl text-cararra-700 bg-cararra-200 disabled:opacity-40 font-inter font-semibold hover:bg-cararra-300"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FiChevronsLeft />
                        </button>
                        <button
                            className="py-1 px-2 rounded-lg text-2xl text-cararra-700 bg-cararra-200 disabled:opacity-40 font-inter font-semibold hover:bg-cararra-300"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FiChevronLeft />
                        </button>
                        <span className="flex items-center gap-1 font-inter font-semibold text-cararra-700 text-base">
                            <div>Page</div>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount().toLocaleString()}
                        </span>
                        <button
                            className="py-1 px-2 rounded-lg text-2xl text-cararra-700 bg-cararra-200 disabled:opacity-40 font-inter font-semibold hover:bg-cararra-300"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <FiChevronRight />
                        </button>
                        <button
                            className="py-1 px-2 rounded-lg text-2xl text-cararra-700 bg-cararra-200 disabled:opacity-40 font-inter font-semibold hover:bg-cararra-300"
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
                        className="bg-cararra-200 hover:bg-cararra-300 rounded-lg px-2 py-1 font-inter text-base text-cararra-700 font-semibold w-32"
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize} className="font-inter text-base text-cararra-700 font-semibold">
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
