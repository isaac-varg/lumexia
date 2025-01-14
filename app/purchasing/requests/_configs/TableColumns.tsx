"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
    columnHelper.accessor("title", {
        header: SortableHeaderType("Title")
    }),
    columnHelper.accessor("statusName", {
        header: "Status ",
        cell: (row) => {
            return row.row.original.status?.name;
        },
        filterFn: (row, id, value) => {
            console.log(row);
            return value.includes(row.getValue(id));
        },
    }),
columnHelper.accessor("priorityName", {
        header: "Priority",
        cell: (row) => {
            return row.row.original.priority?.name;
        },
        filterFn: (row, id, value) => {
            console.log(row);
            return value.includes(row.getValue(id));
        },
    }),

]
