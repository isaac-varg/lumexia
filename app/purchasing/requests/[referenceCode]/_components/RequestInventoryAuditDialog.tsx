import AuditRequest from '@/app/production/planning/[bprReference]/_components/panels/bom/AuditRequest'
import Dialog from '@/components/Dialog'

const RequestInventoryAuditDialog = ({ itemId }: { itemId: string }) => {

    return (
        <Dialog.Root identifier='requestnewinventoryaudit'>
            <Dialog.Title>Request Inventory Audit</Dialog.Title>
            <div>
                <AuditRequest itemId={itemId} />
            </div>
        </Dialog.Root>
    )
}

export default RequestInventoryAuditDialog
