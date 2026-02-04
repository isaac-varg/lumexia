'use client'

import Alert from "@/components/Alert"
import lotActions from "@/actions/inventory/lotActions"
import { generateLotNumber } from "@/utils/lot/generateLotNumber"
import { useItemSelection } from "@/store/itemSlice"
import useToast from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import useDialog from "@/hooks/useDialog"
import lotOriginActions from "@/actions/inventory/lotOriginActions"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

const CreateLotDialog = () => {
  const { item } = useItemSelection()
  const { toast } = useToast()
  const router = useRouter()
  const { resetDialogContext } = useDialog()

  const handleCreateLot = async () => {
    if (!item) return

    try {
      const lotNumber = generateLotNumber(item.referenceCode, new Date())

      const newLot = await lotActions.createNew({
        itemId: item.id,
        lotNumber: lotNumber,
        initialQuantity: 1,
        uomId: item.inventoryUomId,

      })

      await lotOriginActions.createNew({
        lotId: newLot.id,
        originType: 'manuallyCreated'
      });

      await createActivityLog('Create Lot Manually', 'item', item.id, { context: `${newLot.referenceCode} was created manually from item dashboard.` })

      toast('Lot Created', `Lot ${lotNumber} has been created.`, 'success')
      resetDialogContext()
      router.refresh()
    } catch (error) {
      toast('Error', 'Failed to create lot.', 'error')
    }
  }

  if (!item) return null

  return (
    <Alert.Root identifier="createLot">
      <Alert.Content
        title="Create New Lot"
        action={handleCreateLot}
        actionLabel="Create"
        actionColor="success"
        cancelAction={() => { }}
      >
        Are you sure you want to create a new lot for {item.name}? A lot number will be automatically generated.
      </Alert.Content>
    </Alert.Root>
  )
}

export default CreateLotDialog
