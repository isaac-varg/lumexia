import Form from "@/components/Form"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { TagSelectOptions } from '@/components/Form/TagSelect'
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { getUserId } from "@/actions/users/getUserId"
import { qualityActions } from "@/actions/quality"
import { staticRecords } from "@/configs/staticRecords"
import { usePlanningDashboardActions, usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import { productionActions } from "@/actions/production"

type Inputs = {
    noteTypeId: string,
    content: string,
}

const NotesAddMode = ({ setMode }: { setMode: Dispatch<SetStateAction<'view' | 'addNote' | 'addType'>> }) => {

    const form = useForm<Inputs>({ defaultValues: { content: '', noteTypeId: staticRecords.production.bprNotes.types.default } })
    const { bprNoteTypes, bpr } = usePlanningDashboardSelection()
    const { getBprNotes } = usePlanningDashboardActions()
    console.log(bprNoteTypes)

    const typeOptions: TagSelectOptions[] = bprNoteTypes.map((type) => {
        return { value: type.id, label: type.name, bgColor: type.bgColor, textColor: type.textColor }
    });


    const handleSubmit = async (data: Inputs) => {
        if (!bpr) return;

        const userId = await getUserId()
        await productionActions.bprs.notes.create({
            bprId: bpr.id,
            userId: userId,
            noteTypeId: data.noteTypeId,
            content: data.content
        });

        getBprNotes()
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
