"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();


// TODO ABSTRACT THIS FUNCTION SO YOU CAN USE IT ON ALL SORTABLE HEADERS!! SEE CONTAINER TPYE BELOW
const sortableHeader = (title: string) => ({ column }: any) => {
  return (
    <div onClick={() => column.toggleSorting()}>
      <span className="flex flex-row items-center hover:cursor-pointer space-x-2">
        <div>{title}</div>
        <SortableHead sorted={column.getIsSorted()} />
      </span>
    </div>
  );
};

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
    header: sortableHeader("Container Type"),
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
