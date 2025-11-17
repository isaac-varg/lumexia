"use client";
import { PurchaseOrderAll } from "@/actions/purchasing/purchaseOrders/getAll";
import { FilterFunction } from "@/components/DataTable/FilterFunction";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import Tag from "@/components/Text/Tag";
import { dateFormatWithTime } from "@/configs/data/dateFormatString";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<PurchaseOrderAll>();

export const columns = [
  columnHelper.accessor("referenceCode", {
    header: SortableHeaderType("#")
  }),
  columnHelper.accessor("supplier.id", {
    id: "supplierCol",
    header: "Supplier",
    cell: (row) => row.row.original.supplier.name,
    filterFn: FilterFunction,


  }),
  columnHelper.accessor("status.id", {
    header: "Status",
    cell: (row) => {
      const { bgColor, textColor, name, } = row.row.original.status;
      return (
        <Tag
          bgColor={bgColor}
          textColor={textColor}
          label={name}
        />
      )
    }
  }),
  columnHelper.accessor("updatedAt", {
    header: SortableHeaderType("Updated"),
    cell: (row) => {
      return DateTime.fromJSDate(row.row.original.updatedAt).toFormat(dateFormatWithTime);
    }
  }),

];


