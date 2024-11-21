"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";

const columnHelper = createColumnHelper<any>();

export const ItemTableLockedColumns = [
    columnHelper.accessor("itemReferenceCode", {
        header: "IID",
    }),
    columnHelper.accessor("itemName", {
        header: "Item",
        cell: (props) => {

            if (props.row.original.alias) {
                return props.row.original.alias;
            }

            return props.row.original.item.name;
        }
    }),
    columnHelper.accessor("pricePerUnit", {
        header: "Price",
        cell: (props) => {
            return toFracitonalDigits.curreny(props.row.original.pricePerUnit)
        }
    }),
    columnHelper.accessor("quantity", {
        header: "Qty",
        cell: (props) => {
            return toFracitonalDigits.weight(props.row.original.quantity)
        }
    }),
    columnHelper.accessor("uom.abbreviation", {
        header: "UOM",
    }),
    columnHelper.display({
        id: "total",
        cell: (props) => {
            return toFracitonalDigits.curreny(props.row.original.pricePerUnit * props.row.original.quantity);
        },
        header: "Total",
    }),
]
