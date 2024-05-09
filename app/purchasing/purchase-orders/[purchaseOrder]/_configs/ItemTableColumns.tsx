import TableCell from "@/components/DataTable/TableCell";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FlattenedPurchaseOrder } from "../../_functions/flattenPurchaseOrders";
import { FlattenedOrderItem } from "../_functions/flattenOrderItems";
import { EditCell } from "@/components/DataTable/EditCell";

export interface PurchaseOrderItemTData {
  itemReferenceCode: string;
  itemName: string;
  pricePerUnit: number;
  quantity: number;
  uomAbbreviation: string;

}



const columnHelper = createColumnHelper<FlattenedOrderItem>();

const columns = [
  columnHelper.accessor("itemReferenceCode", {
    header: "IID",
  }),
  columnHelper.accessor("itemName", {
    header: "Item",
  }),
  columnHelper.accessor("pricePerUnit", {
    header: "Price",
  }),
  columnHelper.accessor("quantity", {
    header: "Qty",
    cell: TableCell,
    meta: {
        type: "number"
    }
  }),
  columnHelper.accessor("uomAbbreviation", {
    header: "UOM",
  }),
  columnHelper.display({
    id: "total",
    cell: (props) => {
      return props.row.original.pricePerUnit * props.row.original.quantity;
    },
    header: "Total",
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  })
];

export default columns;
