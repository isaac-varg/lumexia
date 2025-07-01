import { accountingActions } from "@/actions/accounting"
import { PricingTemplatePayload } from "@/actions/accounting/finishedProducts/templates/create"
import Form from "@/components/Form"
import { staticRecords } from "@/configs/staticRecords"
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import { defaultTheme } from "json-edit-react"
import { useForm } from "react-hook-form"


const StepPricingTemplate = () => {

    const { itemTypes, step, isExistingTemplate, existingTemplate } = usePricingTemplateWizardSelection()
    const { nextStep, setIntermediateTemplateData, getExistingTemplate } = usePricingTemplateWizardActions()
    const form = useForm<PricingTemplatePayload>({ defaultValues: ((isExistingTemplate && existingTemplate) ? { name: existingTemplate.name, description: existingTemplate.description, forItemTypeId: existingTemplate.forItemTypeId } : { name: '', description: '', forItemTypeId: 'f8054593-f918-4619-a0b3-aa61f1b59418' }) })

    const handleSubmit = async (data: PricingTemplatePayload) => {
        setIntermediateTemplateData(data)

        if (isExistingTemplate) {
            await handleUpdate(data)
        } else {
            await handleNew(data)
        }
        nextStep()

    }

    const handleUpdate = async (data: PricingTemplatePayload) => {
        if (!existingTemplate) return;
        await accountingActions.finishedProducts.templates.update(existingTemplate.id, data)
        getExistingTemplate(existingTemplate.id);

    }

    const handleNew = async (data: PricingTemplatePayload) => {
        const template = await accountingActions.finishedProducts.templates.create(data);
        getExistingTemplate(template.id)

    }

    if (step !== 0) return false

    return (
        <div>

            <Form.Root form={form} onSubmit={handleSubmit} >

                <Form.Text form={form} fieldName="name" label="Name" required />
                <Form.Text form={form} fieldName="description" label="Description" required />
                <Form.Select form={form} fieldName="forItemTypeId" label="For Item Type" options={itemTypes.map(it => ({ value: it.id, label: it.name }))} />

                <Form.ActionRow form={form} />


            </Form.Root>

        </div>
    )
}

export default StepPricingTemplate
