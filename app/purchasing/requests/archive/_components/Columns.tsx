"use client";
import { Requests } from "@/actions/purchasing/getAllRequests";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { dateFormatString } from "@/configs/data/dateFormatString";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<Requests>();

export const columns = [
    columnHelper.accessor("referenceCode", {
        header: SortableHeaderType("#")
    }),

    columnHelper.accessor("item.id", {
        id: "item.id",
        header: SortableHeaderType("Item"),
        cell: (row) => {
            return row.row.original.item.name;
        },
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
        // id: "itemType",
        header: "Created",
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.createdAt).toFormat(dateFormatString);
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
]
