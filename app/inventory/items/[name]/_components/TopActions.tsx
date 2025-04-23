'use client'

import AuditDialog from "./AuditDialog"
import useDialog from "@/hooks/useDialog"

const TopActions = ({ itemId }: { itemId: string }) => {
    const { showDialog } = useDialog()
    const handleAudit = () => {
        showDialog('inventoryMainAuditDialog')
    }
    return (
        <div className="flex">
            <AuditDialog itemId={itemId} />

            <button
                onClick={() => handleAudit()}
                className="btn">
                Inventory Audit
            </button>
        </div>
    )
}

export default TopActions
