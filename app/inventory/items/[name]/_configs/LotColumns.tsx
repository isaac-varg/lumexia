"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const lotsColumns = [
    columnHelper.accessor("lotNumber", {
        header: "Lot Number",
    }),
    columnHelper.accessor("containerTypeName", {
        header: "Container Type",
    }),
    columnHelper.accessor("containerQuantity", {
        header: "Containers Qty",
    }),
    columnHelper.accessor("totalQuantityOnHand", {
        header: "Total Qty",
    }),
    columnHelper.accessor("uomAbbreviation", {
        header: "UOM",
    })
]