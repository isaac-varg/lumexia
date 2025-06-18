import AuditRequest from "@/app/production/planning/[bprReference]/_components/panels/bom/AuditRequest"
import Dialog from "@/components/Dialog"

const AuditDialog = ({ itemId }: { itemId: string }) => {
    return (
        <Dialog.Root identifier="inventoryMainAuditDialog">

            <Dialog.Title>Request an Inventory Audit</Dialog.Title>

            <p className="font-poppins mb-6">Add some notes for the auditor</p>

            <AuditRequest itemId={itemId} />
        </Dialog.Root>
    )
}

export default AuditDialog
