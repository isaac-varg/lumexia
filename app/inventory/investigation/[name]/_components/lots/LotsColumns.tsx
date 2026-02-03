'use client'

import { InvestigationLot } from "../../_actions/getInvestigationData"
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { createColumnHelper } from "@tanstack/react-table"
import { DateTime } from "luxon"
import { FiChevronDown, FiChevronRight } from "react-icons/fi"

const columnHelper = createColumnHelper<InvestigationLot>()

export const lotsColumns = [
  columnHelper.display({
    id: 'expand',
    header: '',
    cell: ({ row }) => (
      <button onClick={(e) => { e.stopPropagation(); row.toggleExpanded() }} className="p-1">
        {row.getIsExpanded() ? <FiChevronDown /> : <FiChevronRight />}
      </button>
    ),
    size: 40,
  }),
  columnHelper.accessor("lotNumber", {
    header: SortableHeaderType("Lot #"),
  }),
  columnHelper.accessor('totalQuantityOnHand', {
    header: SortableHeaderType('On Hand'),
    cell: (row) => toFracitonalDigits.weight(row.row.original.totalQuantityOnHand),
  }),
  columnHelper.accessor('initialQuantity', {
    header: 'Initial Qty',
    cell: (row) => toFracitonalDigits.weight(row.row.original.initialQuantity),
  }),
  columnHelper.accessor('isDepleted', {
    id: 'isDepleted',
    header: 'Depleted',
    cell: (row) => row.row.original.isDepleted
      ? <div className="badge badge-error badge-sm">Yes</div>
      : <div className="badge badge-success badge-sm">No</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }),
  columnHelper.accessor('lotOrigin', {
    id: 'lotOrigin',
    header: 'Origin',
    cell: (row) => {
      const origin = row.row.original.lotOrigin
      switch (origin?.originType) {
        case 'purchaseOrderReceiving':
          return `PO #${origin.purchaseOrder?.referenceCode}`
        case 'bprProduction':
          return `BPR #${origin.bpr?.referenceCode}`
        default:
          return 'Unknown'
      }
    }
  }),
  columnHelper.accessor('transactions', {
    id: 'transactionCount',
    header: 'Transactions',
    cell: (row) => row.row.original.transactions.length,
  }),
  columnHelper.accessor('lotNotes', {
    id: 'noteCount',
    header: 'Notes',
    cell: (row) => row.row.original.lotNotes.length,
  }),
  columnHelper.accessor('createdAt', {
    header: SortableHeaderType('Created'),
    cell: (row) => DateTime.fromJSDate(row.row.original.createdAt).toFormat("DD"),
  }),
]
