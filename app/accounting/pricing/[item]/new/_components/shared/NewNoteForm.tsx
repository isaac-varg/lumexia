'use client'

import Form from "@/components/Form"
import { useForm } from "react-hook-form"
import useDialog from "@/hooks/useDialog"
import { TagSelectOptions } from "@/components/Form/TagSelect"
import { staticRecords } from "@/configs/staticRecords"
import { Dispatch, SetStateAction } from "react"
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes"
import { accountingActions } from "@/actions/accounting"
import { getUserId } from "@/actions/users/getUserId"
import { usePricingSharedActions } from "@/store/pricingSharedSlice"

type Inputs = {
    noteTypeId: string
    content: string
}
const NewNoteForm = ({ types, examinationId, setMode, itemId }: {
    types: PricingExaminationNoteType[], examinationId: string, setMode: Dispatch<SetStateAction<'addNoteType' | 'default'>>, itemId: string
}) => {

    const form = useForm<Inputs>({ defaultValues: { noteTypeId: staticRecords.pricing.notes.noteTypes.default } });
    const { resetDialogContext } = useDialog()
    const { getExaminationNotes } = usePricingSharedActions()

    const typeOptions: TagSelectOptions[] = types.map((type) => {
        return { value: type.id, label: type.name, bgColor: type.bgColor, textColor: type.textColor }
    });



    const handleSubmit = async (data: Inputs) => {


        const userId = await getUserId()
        const payload = {
            ...data,
            userId,
            pricingExaminationId: examinationId,
        }
        await accountingActions.examinations.notes.create(payload, { examinationId, examinedItemId: itemId })
        getExaminationNotes(examinationId)


        resetDialogContext()


    }
    return (
        <div>
            <Form.Root form={form} onSubmit={handleSubmit} >

                <Form.TextArea form={form} fieldName="content" label="Note" required />

                <Form.TagSelect form={form} fieldName="noteTypeId" label="Type" options={typeOptions} onAddNew={() => setMode('addNoteType')} />

                <Form.ActionRow form={form} />
            </Form.Root>
        </div>
    )
}

export default NewNoteForm
