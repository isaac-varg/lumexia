"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";
import { DiscrepancyItem } from "../_actions/getDiscrepancyItem";

const columnHelper = createColumnHelper<DiscrepancyItem>();

export const auditItemColumns = [
    columnHelper.accessor("item.name", {
        id: 'itemName',
        header: SortableHeaderType("Item"),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("status.name", {
        id: 'status',
        header: "Status",

    }),
]
