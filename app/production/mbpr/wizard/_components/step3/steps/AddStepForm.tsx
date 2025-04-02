import { productionActions } from '@/actions/production'
import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import useDialog from '@/hooks/useDialog'
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import { Prisma } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
    label: string
    phase: string
}
const AddStepForm = () => {

    const form = useForm<Inputs>()
    const { stepSequence , selectedMbpr} = useMbprWizardSelection()
    const { addStep} = useMbprWizardActions()
    const { resetDialogContext} = useDialog()

    const handleSubmit = async (data: Inputs) => {

        if (!selectedMbpr) return;

        const payload: Prisma.BatchStepUncheckedCreateInput = {
            label: data.label,
            phase: data.phase,
            sequence: stepSequence,
            mbprId: selectedMbpr.id
        }
        const step = await productionActions.mbprs.steps.create(payload)

        addStep(step)
        resetDialogContext()


    }
    return (
        <Dialog.Root identifier='addStepForm'>
            <Form.Root onSubmit={handleSubmit} form={form}>

                <Form.Text form={form} fieldName='label' label='Label' required />
                <Form.Text form={form} fieldName='phase' label='Phase' required />

                <Form.ActionRow form={form} />

            </Form.Root>

        </Dialog.Root>
    )
}

export default AddStepForm
