'use client'

import { useRouter } from "next/navigation"
import AuditDialog from "./AuditDialog"
import useDialog from "@/hooks/useDialog"

const TopActions = ({ itemId }: { itemId: string }) => {
  const { showDialog } = useDialog()
  const router = useRouter();

  const handleAudit = () => {
    showDialog('inventoryMainAuditDialog')
  }

  const handlePurchaseRequest = () => {
    router.push(`/purchasing/requests/new?itemId=${itemId}`)
  }
  return (
    <div className="flex gap-6">
      <AuditDialog itemId={itemId} />

      <button
        onClick={() => handleAudit()}
        className="btn btn-secondary">
        Inventory Audit
      </button>

      <button
        onClick={() => handlePurchaseRequest()}
        className="btn btn-secondary">
        Request Purchase
      </button>

    </div>
  )
}

export default TopActions
