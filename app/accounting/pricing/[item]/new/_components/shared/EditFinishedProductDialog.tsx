import { accountingActions } from '@/actions/accounting';
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem';
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem';
import { revalidatePage } from '@/actions/app/revalidatePage';
import Dialog from '@/components/Dialog'
import Form from '@/components/Form';
import useDialog from '@/hooks/useDialog';
import React from 'react'
import { useForm } from 'react-hook-form';

type Inputs = {
    fillQuantity: number;
    declaredQuantity: number;
    difficultyAdjustmentCost: number;
}

const EditFinishedProductDialog = ({ selectedFinishedProduct }: { selectedFinishedProduct: FinishedProduct | null }) => {


    const { resetDialogContext } = useDialog()


    const form = useForm<Inputs>({ defaultValues: { fillQuantity: selectedFinishedProduct?.fillQuantity, declaredQuantity: selectedFinishedProduct?.declaredQuantity, difficultyAdjustmentCost: selectedFinishedProduct?.difficultyAdjustmentCost } })



    if (!selectedFinishedProduct) return false;

    const handleSubmit = async (data: Inputs) => {

        await accountingActions.finishedProducts.update(selectedFinishedProduct.id, data);

        resetDialogContext()

        location.reload()

    }



    return (
        <Dialog.Root identifier='editFilledConsumerContainer'>
            <Dialog.Title>Edit Filled Container Parameters</Dialog.Title>

            <Form.Root onSubmit={handleSubmit} form={form}>
                <Form.Number form={form} label={`Fill Quantity ${selectedFinishedProduct.fillUom.abbreviation}`} fieldName='fillQuantity' required />
                <Form.Number form={form} label={`Declared Quantity ${selectedFinishedProduct.fillUom.abbreviation}`} fieldName='declaredQuantity' required />
                <Form.Number form={form} label='Difficulty Adjustment Cost' fieldName='difficultyAdjustmentCost' required />


                <Form.ActionRow form={form} />

            </Form.Root>

        </Dialog.Root>
    )
}

export default EditFinishedProductDialog 
