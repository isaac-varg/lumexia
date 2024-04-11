"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { Item } from "@/types/item";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Item>();

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
  columnHelper.accessor("itemType.id", {
    id: "itemType",
    header: "Item Type",
    cell: (row) => {
      return row.row.original.itemType?.name;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("inventoryType.id", {
    id: "inventoryType",
    header: "Inventory Type",
    cell: (row) => {
      return row.row.original.inventoryType?.name;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("procurementType.id", {
    id: "procurementType",
    header: "Procurement Type",
    cell: (row) => {
      return row.row.original.procurementType?.name;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
];
