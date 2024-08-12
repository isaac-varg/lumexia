"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("referenceCode", {
    header: SortableHeaderType("#")
  }),
  columnHelper.accessor("supplierName", {
    header: SortableHeaderType("Supplier"),
  }),
  columnHelper.accessor("updatedAt", {
    header: SortableHeaderType("Updated"),
    cell: (row) => {
      return DateTime.fromJSDate(row.row.original.updatedAt).toFormat("DD @ t")
    }
  }),

];
