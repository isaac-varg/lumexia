import { accountingActions } from "@/actions/accounting"
import Form from "@/components/Form"
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

type Inputs = {
    name: string
    declaredQuantity: number
    fillQuantity: number
    freeShippingCost: number
    difficultyAdjustmentCost: number
}


const FinishedProductEditForm = ({ setIsEdit }: { setIsEdit: Dispatch<SetStateAction<boolean>> }) => {

    const { selectedFinishedProduct } = usePricingTemplateWizardSelection()
    const { setSelectedFinishedProduct } = usePricingTemplateWizardActions()
    const form = useForm<Inputs>({
        defaultValues: (selectedFinishedProduct ? ({
            name: selectedFinishedProduct.name,
            declaredQuantity: selectedFinishedProduct.declaredQuantity,
            fillQuantity: selectedFinishedProduct.fillQuantity,
            freeShippingCost: selectedFinishedProduct.freeShippingCost,
            difficultyAdjustmentCost: selectedFinishedProduct.difficultyAdjustmentCost,
        }) : ({}))
    })


    const { getExistingTemplate, setFinishedProductStepMode } = usePricingTemplateWizardActions()

    const handleSubmit = async (data: Inputs) => {

        if (!selectedFinishedProduct) throw new Error('Finished product not selected')

        const payload = {
            ...data,
        };

        const product = await accountingActions.finishedProducts.templates.finishedProducts.update(selectedFinishedProduct.id, payload)
        setSelectedFinishedProduct(product)
        getExistingTemplate(product.apartOfPricingTemplateId)
        setIsEdit(false);

    }


    return (
        <Form.Root form={form} onSubmit={handleSubmit}>
            <Form.Text form={form} fieldName="name" label="Name" required />

            <Form.Number form={form} fieldName="fillQuantity" label="Fill Quantity (lb)" required />

            <Form.Number form={form} fieldName="declaredQuantity" label="Declared Quantity (lb)" required />

            <Form.Number form={form} fieldName="freeShippingCost" label="Free Shipping Cost ($)" required />

            <Form.Number form={form} fieldName="difficultyAdjustmentCost" label="Difficulty Adjustment Cost ($)" required />


            <Form.ActionRow form={form} />


        </Form.Root>
    )
}

export default FinishedProductEditForm
