"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<any>();

export const purchaseOrderColumns = [
    columnHelper.accessor("referenceCode", {
        header: "PO #",
    }),
    columnHelper.accessor("supplierName", {
        header: "Supplier",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
    }),
    columnHelper.accessor("statusName", {
        header: "Status",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
    }),
    columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (row) => { 
            return DateTime.fromJSDate(row.row.original.createdAt).toFormat("DD @ t")
        }
    }),
    columnHelper.accessor("updatedAt", {
        header: "Updated",
        cell: (row) => { 
            return DateTime.fromJSDate(row.row.original.updatedAt).toFormat("DD @ t")
        }
    }),
]