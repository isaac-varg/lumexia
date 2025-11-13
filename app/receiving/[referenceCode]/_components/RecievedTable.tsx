'use client'
import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import { useCallback, useMemo, useState } from "react"
import { TbQrcode } from "react-icons/tb";
import LabelForm from "./LabelForm";
import SectionTitle from "@/components/Text/SectionTitle";
import DataTable from "@/components/DataTable";
import { receivedColumns } from "./RecievedColumns";
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses";
import Card from "@/components/Card";

const RecievedTable = ({ items }: { items: PurchaseOrderItem[] }) => {

  const [selectedItems, setSelectedItems] = useState<PurchaseOrderItem[]>([])
  const [isLabel, setIsLabel] = useState(false);

  const receivedItems = useMemo(() => {
    return items.filter(i => (i.purchaseOrderStatusId === purchaseOrderStatuses.received))
  }, [items])

  const handleSelectionChange = useCallback((data: PurchaseOrderItem[]) => {
    setSelectedItems(data)
  }, [])

  const handleLabelComplete = () => {

  }

  const handleLabels = () => {
    setIsLabel(true);
  }

  return (

    <div className="flex flex-col gap-4">

      <div className="flex justify-between">
        <SectionTitle>Received</SectionTitle>
      </div>

      <div className="flex gap-2">

        {isLabel && (
          <button
            onClick={handleLabelComplete}
            className="btn btn-error">
            Cancel
          </button>
        )}

        <button
          onClick={handleLabels}
          className={`btn ${selectedItems.length === 0 ? "btn-disabled" : 'btn-accent'}`}>
          <TbQrcode className="size-6" />
        </button>

        {isLabel && (
          <LabelForm items={selectedItems} onComplete={handleLabelComplete} />
        )}



      </div>

      <Card.Root>
        {!isLabel && (
          <DataTable.Selectable<PurchaseOrderItem>
            data={receivedItems}
            columns={receivedColumns}
            onSelectionChange={handleSelectionChange}
          />
        )}

      </Card.Root>
    </div>
  )
}

export default RecievedTable
