"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";
import { DiscrepancyItem } from "../_actions/getDiscrepancyItem";
import { DateTime } from "luxon";
import { dateFormatString } from "@/configs/data/dateFormatString";

const columnHelper = createColumnHelper<DiscrepancyItem>();

export const auditItemColumns = [
    columnHelper.accessor("item.name", {
        id: 'item',
        header: SortableHeaderType("Item"),
        cell: (row) => row.row.original.item.name,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor('lastPo.purchaseOrders.referenceCode', {
        id: 'lastPo',
        header: 'Last PO',
        cell: (row) => row.row.original.lastPo ? `PO #${row.row.original.lastPo?.purchaseOrders.referenceCode} - ${DateTime.fromJSDate(row.row.original.lastPo?.updatedAt).toFormat(dateFormatString)}` : 'No Last PO'
    }),
    columnHelper.accessor("status.id", {
        id: 'status',
        header: "Status",
        cell: (row) => row.row.original.status.name,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
]
