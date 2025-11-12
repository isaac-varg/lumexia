'use client'
import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import { useState } from "react"
import { TbQrcode } from "react-icons/tb";
import LabelForm from "./LabelForm";
import SectionTitle from "@/components/Text/SectionTitle";
import DataTable from "@/components/DataTable";

const RecievedTable = ({ items }: { items: PurchaseOrderItem[] }) => {

  const [selectedItems, setSelectedItems] = useState<PurchaseOrderItem[]>([])
  const [isLabel, setIsLabel] = useState(false);

  const handleLabelComplete = () => {

  }

  const handleLabels = () => {
    setIsLabel(true);
  }

  return (

    <div className="flex flex-col gap-4">

      <div className="flex justify-between">
        <SectionTitle>Receivables</SectionTitle>
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

        {!isLabel && (
          <DataTable.Selectable<PurchaseOrderItem>
            data={selectedItems}
            columns={itemColumns}
            onSelectionChange={handleSelectionChange}
          />
        )}


      </div>
    </div>
  )
}

export default RecievedTable
