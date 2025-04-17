"use client";
import { PricingExaminationAll } from "@/actions/accounting/examinations/getAll";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { dateFormatString } from "@/configs/data/dateFormatString";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<PricingExaminationAll>();

export const latestExaminationsColumns = [
    columnHelper.accessor("examinedItem.id", {
        id: 'examinedItem',
        header: SortableHeaderType("Examined Item"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        cell: (row) => {
            return row.row.original.examinedItem.name
        }
    }),
    columnHelper.accessor("user.name", {
        header: SortableHeaderType("Conducted By"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("approved", {
        header: "Status",
        id: 'approval',
        cell: (row) => {
            const { approved, rejected } = row.row.original
            const isReleased = approved && !rejected
            return <div className={`${!approved ? 'bg-neutral-200' : (isReleased ? 'bg-emerald-300' : 'bg-rose-300')} flex px-2 py-1 rounded-xl font-poppins text-sm w-fit font-semibold`}>
            {!approved ? 'Needs Review' : (isReleased ? 'Approved' : 'Rejected')}</div>
        }
    }),
    columnHelper.accessor("createdAt", {
        header: "Conducted On",
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.createdAt).toFormat(dateFormatString);
        },
    }),
]
