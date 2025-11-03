'use client'
import { PurchaseOrerItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import DataTable from "@/components/DataTable"
import { itemColumns } from "./ItemColumns"

type Props = {
  items: PurchaseOrerItem[]
}

const ItemTable = ({ items }: Props) => {

  return (
    <div>

      <DataTable.Selectable<PurchaseOrerItem>
        data={items}
        columns={itemColumns}
      />
    </div>
  )
}

export default ItemTable
