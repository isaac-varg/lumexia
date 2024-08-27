import stepActionableActions from '@/actions/production/stepActionables'
import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import useDialog from '@/hooks/useDialog'
import useProductionWizard from '@/hooks/useProductionWizard'
import { ActionableType } from '@/types/actionableType'
import { StepActionable } from '@/types/stepActionable'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  actionableTypeId: string
  required: boolean
}


const ActionableForm = ({ actionableTypes }: { actionableTypes: ActionableType[] }) => {

  const form = useForm({defaultValues: {actionableTypeId: '', required: true}})
  const { selectedBatchStep, selectedMbpr, revalidate } = useProductionWizard()
  const { resetDialogContext } = useDialog()

  const handleSubmit = async (data: Inputs) => {
    if (!selectedBatchStep) { throw new Error("Batch step not selected") }

    const { actionableTypeId, required } = data;
    const payload = {
      stepId: selectedBatchStep.id,
      actionableTypeId,
      required,
    }


    const finish = (response: StepActionable) => {

      if (!selectedBatchStep || !selectedMbpr) { throw new Error('Batch step not selected.') }

      createActivityLog('createdBatchActionable', 'mbprId', selectedMbpr?.id, { context: `Created batch actionable.`, actionableId: response.id })
      revalidate()
      resetDialogContext();

    }

    const response = await stepActionableActions.createNew(payload)

    finish(response)


  }


  return (
    <Dialog.Root identifier='createActionableForm' >
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Select
          fieldName='actionableTypeId'
          label='Type'
          form={form}
          options={actionableTypes.map((at) => ({ value: at.id, label: at.name }))}
        />

        <Form.Toggle
          form={form}
          label='Required'
          fieldName='required'
        />

        <Form.ActionRow form={form} />
      </Form.Root>

    </Dialog.Root>
  )
}

export default ActionableForm
