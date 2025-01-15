"use client";

import { Table } from "@tanstack/react-table";
import { RxCross2 } from "react-icons/rx";
import FacetedFilter from "./FacetFilter";
import { Filter } from "@/types/filter";
import DebouncedInput from "../DebouncedInput";
import useDialog from "@/hooks/useDialog";
import ActionButton from "../ActionButton";
import { useTableFilter } from "@/store/tableFilterSlice";
import { TableStateName, useTableFacets } from "@/store/tableFacetsSlice";

interface DataTableFilterbarProps<TData> {
    table: Table<TData>;
    filters?: Filter[] | null;
    dialogIdentifier?: string;
    linkPath?: string;
    actionButtonTitle?: string;
    onEnter?: (row: any) => any;
    tableStateName: TableStateName
}

export default function FilterBar<TData>({
    table,
    filters,
    dialogIdentifier,
    linkPath,
    actionButtonTitle,
    onEnter,
    tableStateName,
}: DataTableFilterbarProps<TData>) {


    const { showDialog } = useDialog();
    const tableFilterState = useTableFilter()
    const tableFacetState = useTableFacets()

    const isFiltered = table.getState().columnFilters.length > 0;

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && table.getRowModel().rows.length === 1) {
            if (onEnter) {
                onEnter(table.getRowModel().rows[0].original);
            } else {
                console.log('not implemented yet.')
            }
        }
    };

    const handleFilterChange = (value: string | number) => {
        // set tanstack state
        table.setGlobalFilter(String(value))


        tableFilterState.setFilter(tableStateName, value as string)

    }

    const handleFacetReset = () => {
        // tanstack
        table.resetColumnFilters()

        // store
        tableFacetState.resetFilter(tableStateName)

    }


    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="flex items-center justify-between py-4 ">

                    <DebouncedInput
                        value={table.getState().globalFilter ?? ""}
                        onChange={(value) => handleFilterChange(value)}
                        onKeyDown={handleEnterPress}
                        placeholder="Search all"
                        className="h-10 w-[150px] lg:w-[250px] bg-bay-leaf-100 rounded-lg px-2 lg:px-3 focus:outline-none focus:ring-2 focus:ring-bay-leaf-600 focus:ring-opacity-50 transition-all duration-200 ease-in-out text-bay-leaf-950 font-poppins"
                    />
                </div>

                {filters && (
                    <div className="flex flex-row items-center gap-x-4">
                        {filters.map((filter, index) => (
                            <FacetedFilter
                                key={index}
                                column={table.getColumn(filter.columnName)}
                                title={filter.filterLabel}
                                options={filter.options}
                                tableStateName={tableStateName}
                            />
                        ))}

                        {isFiltered && (
                            <button
                                onClick={() => handleFacetReset()}
                                className="flex items-center px-2 lg:px-3 font-poppins"
                            >
                                Reset
                                <RxCross2 className="ml-2 h-4 w-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {dialogIdentifier && (
                <ActionButton
                    label={actionButtonTitle ?? "Add"}
                    onClick={() => showDialog(dialogIdentifier)}
                />
            )}
        </div>
    );
}
