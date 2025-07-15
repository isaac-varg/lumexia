"use client"

import { qualityActions } from "@/actions/quality"
import Form from "@/components/Form"
import { useQcExaminationActions } from "@/store/qcExaminationSlice"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { createAccountingNoteType } from "../../_actions/createAccountingNoteType"

type Inputs = {
    name: string
    description: string
    bgColor: string
    textColor: string
}

const CreateNoteTypeForm = ({ setMode, }: { setMode: Dispatch<SetStateAction<'addType' | 'addNote' | 'view'>>, }) => {

    const form = useForm<Inputs>({ defaultValues: { name: 'Name', description: '', bgColor: "#9a4573", textColor: '#ffffff' } });
    const bgColor = form.watch('bgColor');
    const textColor = form.watch('textColor');
    const name = form.watch('name')
    const router = useRouter()

    const handleSubmit = async (values: Inputs) => {

        await createAccountingNoteType(values)
        router.refresh();
        setMode('addNote');
    }

    return (
        <div className="flex flex-col gap-y-4">

            <div className="flex items-center justify-center">
                <div
                    style={{ backgroundColor: bgColor, color: textColor }}
                    className={`font-poppins font-medium text-xl rounded-xl py-2 px-4 `}
                >
                    <h3 className='font-poppins font-medium text-xl'>{name}</h3>
                </div>
            </div>


            <Form.Root form={form} onSubmit={handleSubmit}>

                <Form.Text fieldName="name" label="Type Name" form={form} required />

                <Form.Text fieldName="description" label="Description" form={form} required />


                <div className="grid grid-cols-4 gap-4">
                    <Form.Color fieldName="bgColor" label="Background Color" form={form} />

                    <Form.Color fieldName="textColor" label="Text Color" form={form} />
                </div>

                <div className='flex flex-row justify-end gap-x-2'>
                    <button className='btn btn-warning' onClick={() => setMode('addNote')}>Cancel</button>

                    <button className='btn btn-success' type='submit'>Submit</button>
                </div>

            </Form.Root>
        </div>
    )
}

export default CreateNoteTypeForm
