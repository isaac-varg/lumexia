"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { DateTime } from "luxon";
import { createColumnHelper } from "@tanstack/react-table";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { DashboardPurchaseOrder } from "../_functions/getPurchaseOrders";
import Tag from "@/components/Text/Tag";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";

const columnHelper = createColumnHelper<DashboardPurchaseOrder>();

export const purchaseOrderColumns = [
    columnHelper.accessor("referenceCode", {
        header: SortableHeaderType("PO #"),
    }),
    columnHelper.accessor("supplier.id", {
        id: 'supplier',
        header: SortableHeaderType("Supplier"),
        cell: (row) => row.row.original.supplier.name,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("status.id", {
        id: 'status',
        header: "Status",
        cell: (row) => {
            const { name, bgColor, textColor } = row.row.original.status
            return (
                <Tag label={name} bgColor={bgColor} textColor={textColor} />
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),

    columnHelper.accessor("poAccountingDetail.status.id", {
        id: 'accounting',
        header: "Accounting",
        cell: (row) => {
            if (!row.row.original.poAccountingDetail) return;
            const { name, bgColor, textColor } = row.row.original.poAccountingDetail.status
            return (
                <Tag label={name} bgColor={bgColor} textColor={textColor} />
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),

    columnHelper.accessor("total", {
        header: 'Total ($)',
        cell: (row) => toFracitonalDigits.curreny(row.row.original.total),
    }),

    columnHelper.accessor("updatedAt", {
        header: SortableHeaderType("Updated"),
        cell: (row) => {
            return DateTime.fromJSDate(row.row.original.updatedAt).toFormat("DD @ t")
        }
    }),
]
