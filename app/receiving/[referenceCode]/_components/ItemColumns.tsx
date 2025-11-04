import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<PurchaseOrderItem>()

export const itemColumns = [
  columnHelper.accessor('item.name', {
    header: 'Item Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: info => `${toFracitonalDigits.weight(info.row.original.quantity)} ${info.row.original.uom.abbreviation}`
  })
]
