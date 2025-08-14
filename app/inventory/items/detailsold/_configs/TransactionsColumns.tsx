"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<any>();

export const transactionsColumns = [
  columnHelper.accessor("createdAt", {
    header: "Timestamp",
    cell: (cell) => {
      return DateTime.fromJSDate(cell.row.original.createdAt).toFormat(
        "DD @ t"
      );
    },
  }),
  columnHelper.accessor("transactionTypeName", { header: "Type" }),
  columnHelper.accessor("userName", {
    header: "User",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
  columnHelper.accessor("uomAbbreviation", {
    header: "UOM",
  }),
];
