"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { Item } from "@/types/item";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("name", {
    header: SortableHeaderType("Name")
  }),

  columnHelper.accessor("referenceCode", {
    header: SortableHeaderType("Refrence Code"),
  }),
  columnHelper.accessor("itemTypeName", {
    // id: "itemType",
    header: "Item Type",
    cell: (row) => {
      return row.row.original.itemType?.name;
    },
    filterFn: (row, id, value) => {
      console.log(row);
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("aliasesAll", {
    // id: "aliases",
    header: "Aliases",
    cell: (row) => {
      const count = row.row.original.aliases.length;
      if (count > 2) {
        return count
      } else {
        return row.row.original.aliasesAll;
      }
    },
  }),
];
