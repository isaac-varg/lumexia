'use client'

import { useInvestigationSelection } from "@/store/investigationSlice"
import DataTable from "@/components/DataTable/Default"
import { purchaseOrderColumns } from "./PurchaseOrderColumns"
import Text from "@/components/Text"
import { rowSelectionHandler } from "@/utils/auxiliary/rowSelectionHandler"
import { useRouter } from "next/navigation"

const PurchaseOrders = () => {

  const { purchaseOrders } = useInvestigationSelection()
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-6">
      <Text.SectionTitle>Purchase Orders ({purchaseOrders.length})</Text.SectionTitle>
      <DataTable
        data={purchaseOrders}
        columns={purchaseOrderColumns}
        onRowClick={(row, method) => rowSelectionHandler(
          method,
          `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.purchaseOrderId}`,
          router,
        )}
        tableStateName="investigationPurchaseOrders"
        initialSortBy={[{ id: 'createdAt', desc: true }]}
      />
    </div>
  )
}

export default PurchaseOrders
