"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { Item } from "@/types/item";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting()}>
          <span className="flex flex-row items-center hover:cursor-pointer space-x-2">
            <div>Name</div>
            <SortableHead sorted={column.getIsSorted()} />
          </span>
        </div>
      );
    },
  }),

  columnHelper.accessor("referenceCode", {
    header: "Refrence Code",
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
