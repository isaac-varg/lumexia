import Form from "@/components/Form"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { TagSelectOptions } from '@/components/Form/TagSelect'
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { getUserId } from "@/actions/users/getUserId"
import { qualityActions } from "@/actions/quality"
import { staticRecords } from "@/configs/staticRecords"
import { PoAccountingNoteType } from "@prisma/client"
import { createAccountingNote } from "../../_actions/createAccountingNote"
import { useRouter } from "next/navigation"

type Inputs = {
    noteTypeId: string,
    content: string,
}

const NotesAddMode = ({ setMode, poId, noteTypes }: { setMode: Dispatch<SetStateAction<'view' | 'addNote' | 'addType'>>, poId: string, noteTypes: PoAccountingNoteType[] }) => {


    const form = useForm<Inputs>({ defaultValues: { content: '', noteTypeId: staticRecords.accounting.notes.types.default } })

    const router = useRouter()
    const typeOptions: TagSelectOptions[] = noteTypes.map((type) => {
        return { value: type.id, label: type.name, bgColor: type.bgColor, textColor: type.textColor }
    });


    const handleSubmit = async (data: Inputs) => {
        if (!poId) return;

        const userId = await getUserId()
        await createAccountingNote({
            purchaseOrderId: poId,
            userId,
            noteTypeId: data.noteTypeId,
            content: data.content,
        })
        router.refresh();
        setMode('view');

    }

    const handleCancel = () => {
        setMode("view");
        form.reset()
    }

    const handleAddNewType = () => {
        setMode('addType')
    }



    return (
        <Form.Root form={form} onSubmit={handleSubmit}>


            <Form.TagSelect form={form} fieldName="noteTypeId" onAddNew={handleAddNewType} label="Type" options={typeOptions} />

            <Form.Text form={form} fieldName="content" label="Content" required />


            <div className='flex flex-row justify-end gap-x-2'>
                <button className='btn btn-warning' onClick={() => handleCancel()}>Cancel</button>
                <button className='btn btn-success' type='submit'>Submit</button>
            </div>



        </Form.Root>
    )
}

export default NotesAddMode
