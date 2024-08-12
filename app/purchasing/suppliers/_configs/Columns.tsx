"use client";
import SortableHead from "@/components/DataTable/SortableHead";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor("name", {
    header: SortableHeaderType("Name")  }),
];
