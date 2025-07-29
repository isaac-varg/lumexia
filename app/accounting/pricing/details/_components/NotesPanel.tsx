'use client'
import { accountingActions } from "@/actions/accounting"
import { SinglePricingExamNote } from "@/actions/accounting/examinations/getOne"
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { createPricingExamNote } from "../_functions/createPricingExamNote"
import { useRouter } from "next/navigation"

const NotesPanel = ({ notes, noteTypes, pricingExaminationId }: { notes: SinglePricingExamNote[], noteTypes: PricingExaminationNoteType[], pricingExaminationId: string }) => {

    const router = useRouter()
    const handleNoteAdd = async (data: NoteInputs) => {
        const userId = await getUserId()
        const payload = {
            ...data,
            userId,
            pricingExaminationId,
        }
        await createPricingExamNote(payload)
        router.refresh()

    }

    const handleNoteTypeAdd = async (values: NoteTypeInputs) => {

        await accountingActions.examinations.notes.createNoteType(values);

         

    }

    return (
        <Card.Root>
            <Card.Title>Notes</Card.Title>

            <NotesManager<SinglePricingExamNote, PricingExaminationNoteType>
                notes={notes}
                noteTypes={noteTypes}
                onNoteAdd={handleNoteAdd}
                onNoteTypeAdd={handleNoteTypeAdd}
                maxHeight="max"
            />


        </Card.Root >

    )
}

export default NotesPanel
