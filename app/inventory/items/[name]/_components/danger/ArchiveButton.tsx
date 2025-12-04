'use client'
import { useItemSelection } from "@/store/itemSlice"
import { archiveItem } from "../../_actions/inventory/archiveItem"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { useRouter } from "next/navigation"
import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"
import SectionTitle from "@/components/Text/SectionTitle"
import Card from "@/components/Card"

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
    <div className="flex flex-col gap-4">
      <SectionTitle>Archive Item</SectionTitle>

      <Card.Root>
        <div className="justify-between h-full flex flex-col">
          <div className="font-poppins text-xl font-medium text-base-content">
            This will effectively delete this item. Use with extreme caution.
          </div>

          <button onClick={() => showDialog('archiveItem')} className="btn btn-error btn-outline">Archive Item</button>

        </div>
      </Card.Root>
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
