import { accountingActions } from "@/actions/accounting";
import { PricingTemplateAuxiliaryPayload } from "@/actions/accounting/finishedProducts/templates/auxiliaries/create";
import Form from "@/components/Form";
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
    auxiliaryItemId: string
    quantity: number
    difficultyAdjustmentCost: number
}

const AuxiliaryForm = ({ setIsAddMode }: { setIsAddMode: Dispatch<SetStateAction<boolean>> }) => {
    const { packagingItems, selectedFinishedProduct } = usePricingTemplateWizardSelection();
    const { getExistingTemplate, getFinishedProductAuxiliaries } = usePricingTemplateWizardActions()
    const form = useForm<Inputs>();


    const handleSubmit = async (data: Inputs) => {
        if (!selectedFinishedProduct) {
            throw new Error("Cannot edit auxiliaries without selected finished product")
        }
        const payload: PricingTemplateAuxiliaryPayload = {
            apartOfPricingTemplateFinishedProductId: selectedFinishedProduct.id,
            ...data
        }
        await accountingActions.finishedProducts.templates.auxiliaries.create(payload)
        getExistingTemplate(selectedFinishedProduct.apartOfPricingTemplateId)
        getFinishedProductAuxiliaries()
        setIsAddMode(false)
    }

    return (
        <div>
            <Form.Root form={form} onSubmit={handleSubmit} >

                <Form.Select form={form} fieldName="auxiliaryItemId" label="Item" options={packagingItems.map(pi => ({ label: pi.name, value: pi.id }))} />
                <Form.Number form={form} fieldName="quantity" label="Quantity" required />
                <Form.Number form={form} fieldName="difficultyAdjustmentCost" label="Difficulty Adjustment Cost ($)" required />

                <div className="flex justify-end" >

                    <button className="btn bg-rose-300" onClick={() => setIsAddMode(false)}>Cancel</button>

                    <button className="btn btn-success" type="submit">Add</button>
                </div>


            </Form.Root>
        </div>
    )
}

export default AuxiliaryForm
