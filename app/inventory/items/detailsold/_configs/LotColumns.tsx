"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const lotsColumns = [
  columnHelper.accessor("lotNumber", {
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting()}>
          <span className="flex flex-row items-center hover:cursor-pointer space-x-2">
            <div>Lot Number</div>
            <SortableHead sorted={column.getIsSorted()} />
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("containerTypeName", {
    header: SortableHeaderType("Container Type"),
  }),
  columnHelper.accessor("containerQuantity", {
    header: SortableHeaderType("Containers Qty"),
  }),
  columnHelper.accessor("totalQuantityOnHand", {
    header: SortableHeaderType("Total Qty"),
  }),
  columnHelper.accessor("uomAbbreviation", {
    header: "UOM",
  })
]
