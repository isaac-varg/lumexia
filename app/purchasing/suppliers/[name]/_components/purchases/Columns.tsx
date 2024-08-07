"use client";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<any>();

export const purchasesColumns = [
	columnHelper.accessor("referenceCode", {
		header: "PO #",
	}),
	columnHelper.accessor("total", {
		header: "Total ($)",
		cell: (row) => {
			return toFracitonalDigits.curreny(row.row.original.total);
		}
	}),
	columnHelper.accessor("createdAt", {
		header: "Created",
		cell: (row) => {
			return DateTime.fromJSDate(row.row.original.createdAt).toFormat("DD @ t");
		},
	}),
	columnHelper.accessor("updatedAt", {
		header: "Updated",
		cell: (row) => {
			return DateTime.fromJSDate(row.row.original.updatedAt).toFormat("DD @ t");
		},
	}),
];
