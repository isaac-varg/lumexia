"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("referenceCode", {
    header: SortableHeaderType("Reference Code"),
  }),
  columnHelper.accessor("producedItemName", {
    header: "Item",
    cell: (row) => {
      return row.row.original.producedItemName;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
columnHelper.accessor("bprStatusName", {
    header: "Status",
    cell: (row) => {
      return row.row.original.bprStatusName;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
//  columnHelper.accessor("aliasesAll", {
//    // id: "aliases",
//    header: "Aliases",
//    cell: (row) => {
//      const count = row.row.original.aliases.length;
//      if (count > 2) {
//        return count
//      } else {
//        return row.row.original.aliasesAll;
//      }
//    },
//  }),
];
