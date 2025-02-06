'use client'

import Form from "@/components/Form"
import { RequestNoteType } from "../_functions/getNoteTypes"
import { useForm } from "react-hook-form"
import { createRequestNote } from "../_functions/createRequestNote"
import useDialog from "@/hooks/useDialog"
import { TagSelectOptions } from "@/components/Form/TagSelect"
import { staticRecords } from "@/configs/staticRecords"
import { Dispatch, SetStateAction } from "react"

type Inputs = {
    noteTypeId: string
    content: string
}
const NewNoteForm = ({ types, requestId, setMode  }: {
    types: RequestNoteType[], requestId: string, setMode: Dispatch<SetStateAction<'addNoteType' | 'default'>>
}) => {

    const form = useForm<Inputs>({defaultValues: {noteTypeId: staticRecords.purchasing.requestTypes.default}});
    const { resetDialogContext } = useDialog()

    const typeOptions: TagSelectOptions[] = types.map((type) => {
        return { value: type.id, label: type.name, bgColor: type.bgColor, textColor: type.textColor }
    });

   

    const handleSubmit = async (data: Inputs) => {

        await createRequestNote(requestId, data.content, data.noteTypeId)

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
