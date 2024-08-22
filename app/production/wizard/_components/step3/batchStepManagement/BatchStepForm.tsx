"use client"

import batchStepActions from "@/actions/production/batchSteps"
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import useProductionWizard from "@/hooks/useProductionWizard"
import { BatchStep } from "@/types/batchStep"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { useForm } from "react-hook-form"

interface BatchStepFormInputs {
  sequence: number
  phase: string
  label: string
}

const BatchStepForm = ({ batchStep }: { batchStep?: BatchStep } ) => {
  const { selectedMbpr, revalidate } = useProductionWizard()
  const { resetDialogContext } = useDialog();

  const defaultValues = {
    sequence: batchStep ? batchStep.sequence : 0,
    phase: batchStep ? batchStep.phase : '',
    label: batchStep ? batchStep.label : ''
  }

  const form = useForm<BatchStepFormInputs>({ defaultValues })

  const handleSubmit = async (data: BatchStepFormInputs) => {

    const { sequence, phase, label } = data;

    const payload = {
      mbprId: selectedMbpr?.id,
      sequence,
      phase,
      label,
    }

    const finish = (response: BatchStep) => {

      if (!selectedMbpr) { throw new Error('MBPR not selected.') }

      createActivityLog(`${batchStep ? 'updatedBatchStep' : 'createdBatchStep'}`, 'mbprId', selectedMbpr?.id, { context: `${batchStep ? 'Updated batch step' : 'Created new batch step'}` })
      revalidate()
      resetDialogContext();

    }

    const response = await batchStepActions.createNew(payload)

    finish(response)



  }


  return (
    <Dialog.Root identifier={batchStep ? `editBatchStep${batchStep.id}` : 'newBatchStep'}>
      <Form.Root form={form} onSubmit={handleSubmit}>

        <Form.Number
          form={form}
          label="Sequence"
          fieldName="sequence"
          required
        />

        <Form.Text
          form={form}
          label="Phase"
          fieldName="phase"
          required
        />

        <Form.Text
          form={form}
          label="Label"
          fieldName="label"
          required={false}
        />

        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  )
}

export default BatchStepForm
