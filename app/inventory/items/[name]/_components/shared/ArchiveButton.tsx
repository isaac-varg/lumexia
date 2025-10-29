'use client'
import { useItemSelection } from "@/store/itemSlice"
import { archiveItem } from "../../_actions/inventory/archiveItem"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { useRouter } from "next/navigation"

const ArchiveButton = () => {

  const { item } = useItemSelection()
  const router = useRouter()

  const handleArchive = async () => {
    if (!item) return;

    await archiveItem(item.id)
    await createActivityLog('Archive Item', 'item', item.id, { context: 'Archived the item' })
    router.push('/inventory/items')
  }
  return (
    <div className="flex justify-end">
      <button onClick={() => handleArchive()} className="btn btn-error btn-outline">Archive Item</button>
    </div>
  )
}

export default ArchiveButton
