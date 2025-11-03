import { PurchaseOrerItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import { IndeterminateCheckbox } from "@/components/DataTable/IndeterminateCheckbox"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<PurchaseOrerItem>()

export const itemColumns = [
  columnHelper.accessor('item.name', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]
