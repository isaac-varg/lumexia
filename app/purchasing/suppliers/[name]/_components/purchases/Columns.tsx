"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<any>();

export const purchasesColumns = [
    columnHelper.accessor("referenceCode", {
        header: SortableHeaderType("PO #"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },

    }),
    columnHelper.accessor("total", {
        header: SortableHeaderType("Total ($)"),
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original.total);
        }
    }),
    columnHelper.accessor("createdAt", {
        header: SortableHeaderType("Created"),
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.createdAt).toFormat("DD @ t");
        },
    }),
    columnHelper.accessor("updatedAt", {
        header: SortableHeaderType("Updated"),
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.updatedAt).toFormat("DD @ t");
        },
    }),
];
