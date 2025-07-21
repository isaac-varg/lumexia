'use client'
import NotesManager from "@/components/Notes/NotesManager"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import { createGeneralRequestNoteType } from "../_actions/createGeneralRequestNoteType"
import { createGeneralRequestNote } from "../_actions/createGeneralRequestNote"
import { getUserId } from "@/actions/users/getUserId"
import { useRouter } from "next/navigation"
import { GeneralRequestNote } from "../_actions/getAllGeneralRequestNotes"
import { GeneralRequestNoteType } from "../_actions/getAllGeneralRequestNoteTypes"

const NotesPanel = ({ notes, noteTypes, requestId }: { notes: GeneralRequestNote[], noteTypes: GeneralRequestNoteType[], requestId: string }) => {

    const router = useRouter()
    const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
        await createGeneralRequestNoteType(data)
    }

    const handleNoteAdd = async (data: NoteInputs) => {
        const userId = await getUserId()
        await createGeneralRequestNote({
            requestId,
            userId,
            ...data
        });

        router.refresh()
    }

    return (
        <Panels.Root span={2}>
            <SectionTitle size="small">Notes & Additional Info</SectionTitle>

            <NotesManager<GeneralRequestNote, GeneralRequestNoteType>
                notes={notes}
                noteTypes={noteTypes}
                onNoteAdd={handleNoteAdd}
                onNoteTypeAdd={handleNoteTypeAdd}
            />
        </Panels.Root>

    )
}

export default NotesPanel
