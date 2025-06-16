"use client";

import { QcExamination } from "@/actions/quality/qc/records/getAll";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { CellContext, createColumnHelper } from "@tanstack/react-table";



const columnHelper = createColumnHelper<QcExamination>();

export const examColumns = [
    columnHelper.accessor("referenceCode", {
        id: "referenceCode",
        header: "#",
    }),
    columnHelper.accessor("examinedLot.item.id", {
        id: "item",
        header: "Item Name",
        cell: (row) => row.row.original.examinedLot.item.name,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },

    }),
    columnHelper.accessor('conductedBy.name', {
        header: "Conducted By"
    }),

     columnHelper.accessor("examinationType.id", {
        id: "type",
        header: "Type",
        cell: (row) => row.row.original.examinationType.name,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    
      columnHelper.accessor("status.id", {
        id: "status",
        header: "Status",
        cell: (row) => row.row.original.status.name,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
]
