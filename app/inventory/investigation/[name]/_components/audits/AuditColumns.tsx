'use client'

import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType"
import { createColumnHelper } from "@tanstack/react-table"
import { DateTime } from "luxon"

type CombinedAudit = {
  type: string
  id: string
  createdAt: Date
  user: string
  status: string
  transactions: any[]
  details: string
}

const columnHelper = createColumnHelper<CombinedAudit>()

export const auditColumns = [
  columnHelper.accessor("createdAt", {
    header: SortableHeaderType("Date"),
    cell: (row) => DateTime.fromJSDate(row.row.original.createdAt).toFormat("DD @t")
  }),
  columnHelper.accessor("type", {
    header: "Type",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }),
  columnHelper.accessor("user", {
    header: "Conducted By",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("transactions", {
    id: "transactionCount",
    header: "Transactions",
    cell: (row) => row.row.original.transactions.length,
  }),
  columnHelper.accessor("details", {
    header: "Details",
  }),
]
