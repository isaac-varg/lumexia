'use client'
import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import DataTable from "@/components/DataTable"
import { useCallback, useState } from "react"
import { itemColumns } from "./ItemColumns"
import SectionTitle from "@/components/Text/SectionTitle"
import Card from "@/components/Card"

type Props = {
  items: PurchaseOrderItem[]
}

const ItemTable = ({ items }: Props) => {
  const [selectedItems, setSelectedItems] = useState<PurchaseOrderItem[]>([])

  const handleReceiveSelected = async () => {
    console.log(selectedItems);
  }


  const handleSelectionChange = useCallback((data: PurchaseOrderItem[]) => {
    setSelectedItems(data)
  }, [])

  return (


    <div className="flex flex-col gap-4">

      <div className="flex justify-between">
        <SectionTitle>Receivables</SectionTitle>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleReceiveSelected}
          className={`btn ${selectedItems.length === 0 ? "btn-disabled" : 'btn-warning'}`}>
          Partially Receive
        </button>

        <button
          onClick={handleReceiveSelected}
          className={`btn ${selectedItems.length === 0 ? "btn-disabled" : 'btn-success'}`}>
          Fully Receive
        </button>
      </div>

      <Card.Root>

        <DataTable.Selectable<PurchaseOrderItem>
          data={items}
          columns={itemColumns}
          onSelectionChange={handleSelectionChange}
        />
      </Card.Root>
    </div>
  )
}


export default ItemTable
