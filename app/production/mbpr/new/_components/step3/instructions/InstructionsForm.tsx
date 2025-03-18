import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import { StepInstruction } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createStepInstruction } from '../../../_functions/createStepInstruction'
import useProductionWizard from '@/hooks/useProductionWizard'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import useDialog from '@/hooks/useDialog'

type Inputs = {
  instructionContent: string
}

const InstructionsForm = ({ instruction }: { instruction?: StepInstruction }) => {

  const form = useForm<Inputs>()
  const { revalidate, selectedBatchStep } = useProductionWizard()
  const { resetDialogContext } = useDialog()

  const handleSubmit = async (data: Inputs) => {

    if (!selectedBatchStep) { throw new Error("Batch step not selected") }

    const payload = {
      stepId: selectedBatchStep.id,
      instructionContent: data.instructionContent
    }
    const response = await createStepInstruction(payload)
    createActivityLog('createStepInstruction', 'mbpr', selectedBatchStep.mbprId, { context: `Added '${data.instructionContent}' to Step ${selectedBatchStep.sequence}` })
    revalidate()
    resetDialogContext()
  }


  return (
    <Dialog.Root identifier={`${instruction ? `editStepInstruction${instruction.id}}` : 'createNewStepInstruction'}`}>
      <Dialog.Title>Instruction Details</Dialog.Title>


      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.TextArea
          form={form}
          label='Content'
          fieldName='instructionContent'
          required
        />

        <Form.ActionRow form={form} />
      </Form.Root>

    </Dialog.Root>
  )
}

export default InstructionsForm
