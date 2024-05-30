"use client";
import SortableHead from "@/components/DataTable/SortableHead";
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
];
