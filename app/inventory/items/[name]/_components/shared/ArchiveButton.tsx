'use client'
import { useItemSelection } from "@/store/itemSlice"
import { archiveItem } from "../../_actions/inventory/archiveItem"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { useRouter } from "next/navigation"
import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"

const ArchiveButton = () => {

  const { item } = useItemSelection()
  const router = useRouter()
  const { showDialog, resetDialogContext } = useDialog()

  const handleArchive = async () => {
    if (!item) return;

    await archiveItem(item.id)
    await createActivityLog('Archive Item', 'item', item.id, { context: 'Archived the item' })
    router.push('/inventory/items')
    resetDialogContext()
  }
  return (
    <div className="flex justify-end">
      <button onClick={() => showDialog('archiveItem')} className="btn btn-error btn-outline">Archive Item</button>
      <Alert.Root identifier="archiveItem">
        <Alert.Content
          title="Archive Item"
          action={handleArchive}
          actionLabel="Archive"
          actionColor="error"
          cancelAction={resetDialogContext}
        >
          Are you sure you want to archive this item? This action cannot be undone.
        </Alert.Content>
      </Alert.Root>
    </div>
  )
}

export default ArchiveButton
