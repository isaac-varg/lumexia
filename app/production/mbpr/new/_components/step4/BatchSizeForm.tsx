
import batchSizeActions from '@/actions/production/batchSizes'
import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import { staticRecords } from '@/configs/staticRecords'
import { recordStatuses } from '@/configs/staticRecords/recordStatuses'
import { uom } from '@/configs/staticRecords/unitsOfMeasurement'
import useDialog from '@/hooks/useDialog'
import useProductionWizard from '@/hooks/useProductionWizard'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Inputs {
  quantity: number
}

const BatchSizeForm = () => {

  const form = useForm()
  const { selectedMbpr, revalidate } = useProductionWizard()
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {

    if (!selectedMbpr) { return }

    const payload = {
      mbprId: selectedMbpr.id,
      uomId: uom.pounds,
      recordStatusId: recordStatuses.active,
      quantity: data.quantity,
    }

    const response = await batchSizeActions.createNew(payload)

    await createActivityLog('createBatchSize', 'mbpr', selectedMbpr.id, { context: `Created a batch size for MBPR: ${selectedMbpr.versionLabel}` })

    revalidate()
    resetDialogContext()
  }



  return (
    <Dialog.Root identifier='createBatchSize'>

      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Number
          form={form}
          fieldName='quantity'
          label='Quantity (lbs)'
          required
        />

        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  )
}

export default BatchSizeForm
