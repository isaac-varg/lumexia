'use client'
import { accountingActions } from "@/actions/accounting"
import { PricingTemplatePayload } from "@/actions/accounting/finishedProducts/templates/create"
import Form from "@/components/Form"
import Text from "@/components/Text"
import { staticRecords } from "@/configs/staticRecords"
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import { defaultTheme } from "json-edit-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TbEdit } from "react-icons/tb"


const StepPricingTemplate = () => {

    const { itemTypes, step, isExistingTemplate, existingTemplate } = usePricingTemplateWizardSelection()
    const { nextStep, setIntermediateTemplateData, getExistingTemplate } = usePricingTemplateWizardActions()
    const form = useForm<PricingTemplatePayload>()
    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = async (data: PricingTemplatePayload) => {
        setIntermediateTemplateData(data)

        if (isExistingTemplate) {
            await handleUpdate(data)
        } else {
            await handleNew(data)
        }

        setIsEdit(false)
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

    useEffect(() => {
        if (existingTemplate) {
            form.reset({ name: existingTemplate.name, description: existingTemplate.description, forItemTypeId: existingTemplate.forItemTypeId })
            return;
        }
        form.reset({ name: '', description: '', forItemTypeId: 'f8054593-f918-4619-a0b3-aa61f1b59418' })

    }, [isExistingTemplate, existingTemplate, form])

    if (step !== 0) return false

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <Text.SectionTitle size="small">Template Details </Text.SectionTitle>
                <div className="flex gap-2">
                    {!isEdit && <button className="btn bg-orange-300" onClick={() => setIsEdit(true)}><TbEdit /></button>}
                    {!isEdit && <button className="btn bg-emerald-200" onClick={() => nextStep()} >Next Step (Finished Products)</button>}
                </div>
            </div>
            {
                !isEdit && (
                    <div className="flex flex-col gap-4">
                        <Text.LabelDataPair label="Name" data={existingTemplate?.name || ''} />

                        <Text.LabelDataPair label="Description" data={existingTemplate?.description || ''} />
                        <Text.LabelDataPair label="For Item Type" data={existingTemplate?.forItemType?.name || ''} />

                    </div>
                )
            }

            {isEdit && (
                <Form.Root form={form} onSubmit={handleSubmit} >
                    <Form.Text form={form} fieldName="name" label="Name" required />
                    <Form.Text form={form} fieldName="description" label="Description" required />
                    <Form.Select form={form} fieldName="forItemTypeId" label="For Item Type" options={itemTypes.map(it => ({ value: it.id, label: it.name }))} />
                    <div className=" flex gap-2 justify-end">

                        <button className="btn btn-warning" onClick={() => setIsEdit(false)} >Cancel</button>
                        <button className="btn btn-success" type="submit" >Submit</button>

                    </div>
                </Form.Root>
            )}



        </div>
    )
}

export default StepPricingTemplate
