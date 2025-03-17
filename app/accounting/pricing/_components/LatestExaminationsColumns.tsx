"use client";
import { PricingExaminationAll } from "@/actions/accounting/examinations/getAll";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { dateFormatString } from "@/configs/data/dateFormatString";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<PricingExaminationAll>();

export const latestExaminationsColumns = [
    columnHelper.accessor("examinedItem.name", {
        header: SortableHeaderType("Conducted By"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("user.name", {
        header: SortableHeaderType("Conducted By"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("createdAt", {
        header: "Conducted On",
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.createdAt).toFormat(dateFormatString);
        },
    }),
]
