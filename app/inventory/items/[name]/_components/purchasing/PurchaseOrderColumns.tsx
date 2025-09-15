"use client";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { DashboardItemPurchaseOrder } from "../../_actions/purchasing/getItemPurchaseOrders";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import Tag from "@/components/Text/Tag";

const columnHelper = createColumnHelper<DashboardItemPurchaseOrder>();

export const purchaseOrderColumns = [
  columnHelper.accessor("referenceCode", {
    header: SortableHeaderType("PO #"),
  }),
  columnHelper.accessor("supplierName", {
    header: "Supplier",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("statusName", {
    header: "Status",
    cell: (row) => <Tag label={row.row.original.statusName} bgColor={row.row.original.purchaseOrderStatus.bgColor} textColor={row.row.original.purchaseOrderStatus.textColor} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: (row) => toFracitonalDigits.weight(row.row.original.quantity)
  }),
  columnHelper.accessor('lineTotal', {
    header: 'Item Total',
    cell: (row) => toFracitonalDigits.weight(row.row.original.lineTotal)
  }),
  columnHelper.accessor('uom.abbreviation', {
    header: 'Price UOM',
    cell: (row) => `$/ ${row.row.original.uom.abbreviation}`
  }),

]
