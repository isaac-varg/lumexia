import Form from "@/components/Form"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { TagSelectOptions } from '@/components/Form/TagSelect'
import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords"
import { PoAccountingNoteType } from "@prisma/client"
import { useRouter } from "next/navigation"
import { NoteType } from "@/types/note"

export type NoteInputs = {
    noteTypeId: string,
    content: string,
}

interface AddModeProps<TNoteType extends NoteType> {
    setMode: Dispatch<SetStateAction<'view' | 'addNote' | 'addType'>>
    noteTypes: TNoteType[]
    onNoteAdd: (note: { content: string; noteTypeId: string; }) => void;
}

const NotesAddMode = <TNoteType extends NoteType>({ setMode, noteTypes, onNoteAdd }: AddModeProps<TNoteType>) => {

    const form = useForm<NoteInputs>({ defaultValues: { content: '', noteTypeId: noteTypes[0]?.id || '' } })
    const router = useRouter()

    const typeOptions: TagSelectOptions[] = noteTypes.map((type) => {
        return { value: type.id, label: type.name, bgColor: type.bgColor, textColor: type.textColor }
    });

    const handleSubmit = (data: NoteInputs) => {
        onNoteAdd(data);
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
