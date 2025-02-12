import React, { Dispatch, SetStateAction, useState } from 'react'
import { InterimAuditRequestNote } from './AuditRequest'
import Form from '@/components/Form'
import { useForm } from 'react-hook-form'
import { AuditRequestNoteType } from '../_functions/getAuditRequestNoteTypes'
import { TagSelectOptions } from '@/components/Form/TagSelect'
import AuditRequestNoteTypeForm from './AuditRequestNoteTypeForm'
import { staticRecords } from '@/configs/staticRecords'

type AuditRequestFormProps = {
    setReqMode: Dispatch<SetStateAction<"view" | "add">>
    setNotes: Dispatch<SetStateAction<InterimAuditRequestNote[]>>
    types: AuditRequestNoteType[]
    setReval: Dispatch<SetStateAction<string>>

}

type Inputs = {
    noteTypeId: string
    content: string
}

const AuditRequestForm = ({ setReqMode, setNotes, types, setReval }: AuditRequestFormProps) => {

    const form = useForm<Inputs>({ defaultValues: { noteTypeId: staticRecords.inventory.auditRequests.requestNoteTypes.default, content: '' } });
    const [formMode, setFormMode] = useState<'form' | 'type'>('form')

    const typeOptions: TagSelectOptions[] = types.map((t) => {
        return {
            value: t.id,
            label: t.name,
            bgColor: t.bgColor,
            textColor: t.textColor,
        }
    })

    const handleSubmit = async (data: Inputs) => {

        const { value, textColor, bgColor } = typeOptions.filter((t) => t.value === data.noteTypeId)[0];


        setNotes((state) => {
            return [
                ...state,
                {
                    content: data.content,
                    requestNoteTypeId: value,
                    requestNoteType: {
                        bgColor,
                        textColor
                    }
                }
            ]
        });

        setReqMode('view');
    }



    return (
        <div>
            {formMode === 'form' && (
                <Form.Root form={form} onSubmit={handleSubmit}>

                    <Form.TextArea form={form} label='Content' fieldName='content' required />

                    <Form.TagSelect form={form} label='Note Type' fieldName='noteTypeId' options={typeOptions} onAddNew={() => setFormMode('type')} />

                    <div className='flex gap-x-2 justify-end'>
                        <button className='btn btn-warning' onClick={() => setReqMode('view')}>Cancel</button>
                        <button className='btn btn-success' type='submit'>Submit</button>
                    </div>

                </Form.Root>
            )}

            {formMode === 'type' && (
                <AuditRequestNoteTypeForm setFormMode={setFormMode} setReval={setReval} />
            )}

        </div>
    )
}

export default AuditRequestForm
