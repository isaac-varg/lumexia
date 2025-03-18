"use client"

import batchStepActions from "@/actions/production/batchSteps"
import stepEquipmentActions from "@/actions/production/stepEquipment"
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import useProductionWizard from "@/hooks/useProductionWizard"
import { BatchStep } from "@/types/batchStep"
import { Equipment } from "@/types/equipment"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { useForm } from "react-hook-form"

interface Inputs {
  equipmentId: string
}

const EquipmentForm = ({ equipment }: { equipment: Equipment[] }) => {
  const { selectedBatchStep, revalidate, selectedMbpr } = useProductionWizard()
  const { resetDialogContext } = useDialog();


  const form = useForm<Inputs>()

  const handleSubmit = async (data: Inputs) => {

    if (!selectedBatchStep) { throw new Error("Batch step not selected") }

    const { equipmentId } = data;
    const payload = {
      stepId: selectedBatchStep.id,
      equipmentId,
    }


    const finish = (response: BatchStep) => {

      if (!selectedBatchStep || !selectedMbpr) { throw new Error('Batch step not selected.') }

      createActivityLog('updatedBatchStep', 'mbprId', selectedMbpr?.id, { context: `Added equipment to batch step` })
      revalidate()
      resetDialogContext();

    }

    const response = await stepEquipmentActions.createNew(payload)

    finish(response)

  }


  return (
    <Dialog.Root identifier={'addStepEquipment'}>
      <Form.Root form={form} onSubmit={handleSubmit}>

        <Form.Select
          form={form}
          label="Equipment"
          fieldName="equipmentId"
          options={equipment.map((e: Equipment) => ({ value: e.id, label: e.name, }))}
        />

        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  )
}

export default EquipmentForm 
