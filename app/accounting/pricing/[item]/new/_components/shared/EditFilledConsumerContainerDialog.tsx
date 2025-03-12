import { accountingActions } from '@/actions/accounting';
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem';
import { revalidatePage } from '@/actions/app/revalidatePage';
import Dialog from '@/components/Dialog'
import Form from '@/components/Form';
import useDialog from '@/hooks/useDialog';
import React from 'react'
import { useForm } from 'react-hook-form';

type Inputs = {
    fillQuantity: number;
    declaredQuantity: number;
    difficultiesCost: number;
}

const EditFilledConsumerContainerDialog = ({ selectedConsumerContainer }: { selectedConsumerContainer: FilledConsumerContainer | null }) => {

    if (!selectedConsumerContainer) return false;

    const { resetDialogContext } = useDialog()

    const form = useForm<Inputs>({ defaultValues: { fillQuantity: selectedConsumerContainer.fillQuantity, declaredQuantity: selectedConsumerContainer.declaredQuantity, difficultiesCost: selectedConsumerContainer.difficultiesCost } })


    const handleSubmit = async (data: Inputs) => {

        await accountingActions.filledConsumerContainers.update(selectedConsumerContainer.id, data);

        resetDialogContext()

        location.reload()

    }

    return (
        <Dialog.Root identifier='editFilledConsumerContainer'>
            <Dialog.Title>Edit Filled Container Parameters</Dialog.Title>

            <Form.Root onSubmit={handleSubmit} form={form}>
                <Form.Number form={form} label={`Fill Quantity ${selectedConsumerContainer.uom.abbreviation}`} fieldName='fillQuantity' required />
                <Form.Number form={form} label={`Declared Quantity ${selectedConsumerContainer.uom.abbreviation}`} fieldName='declaredQuantity' required />
                <Form.Number form={form} label='Difficulty Cost' fieldName='difficultiesCost' required />


                <Form.ActionRow form={form} />

            </Form.Root>

        </Dialog.Root>
    )
}

export default EditFilledConsumerContainerDialog
