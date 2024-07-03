"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("referenceCode", {
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting()}>
          <span className="flex flex-row items-center hover:cursor-pointer space-x-2">
            <div>#</div>
            <SortableHead sorted={column.getIsSorted()} />
          </span>
        </div>
      );
    },
  }),

  columnHelper.accessor("supplierName", {
    header: "Supplier",
  }),
   columnHelper.accessor("updatedAt", {
        header: "Updated",
        cell: (row) => { 
            return DateTime.fromJSDate(row.row.original.updatedAt).toFormat("DD @ t")
        }
    }),

];
