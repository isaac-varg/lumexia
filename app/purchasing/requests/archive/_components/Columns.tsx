"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { dateFormatString } from "@/configs/data/dateFormatString";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { MergedRequests } from "./Datatable";

const columnHelper = createColumnHelper<MergedRequests>();

export const columns = [
    columnHelper.accessor("referenceCode", {
        header: SortableHeaderType("#")
    }),

    columnHelper.accessor("name", {
        id: "name",
        header: SortableHeaderType("Name"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },

    }),
    columnHelper.accessor("status.id", {
        id: "status.id",
        header: "Status",
        cell: (row) => {
            return row.row.original.status.name;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),

    columnHelper.accessor("requestingUser.id", {
        id: "requestingUser.id",
        header: "Requester",
        cell: (row) => {
            return row.row.original.requestingUser.name;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.createdAt).toFormat(dateFormatString);
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("requestType", {
        header: "Type",
        cell: (row) => {
            return row.row.original.requestType === "general" ? "General" : "Standard"
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
]
