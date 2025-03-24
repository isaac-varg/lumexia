"use client";

import { MbprBom } from "@/actions/production/mbpr/getOneMbpr";
import { fractionalDigits } from "@/configs/data/fractionalDigits";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { TextUtils } from "@/utils/text";
import { createColumnHelper } from "@tanstack/react-table";



const columnHelper = createColumnHelper<MbprBom>();

export const BOMColumns = [
    columnHelper.accessor("identifier", {
        id: "identifier",
        header: "#",
    }),
    columnHelper.accessor('step.phase', {
        header: "Phase"
    }),
    columnHelper.accessor("item.name", {
        header: "Item Name",
    }),
    columnHelper.accessor("concentration", {
        header: "% w/w",
        cell: (row) => {
            return toFracitonalDigits.weight(row.row.original.concentration)
        }
    }),
    columnHelper.accessor("amount", {
        header: "Quantity (lbs)",
        cell: (row) => {
            return toFracitonalDigits.weight(row.row.original.amount)
        }
    })
]
