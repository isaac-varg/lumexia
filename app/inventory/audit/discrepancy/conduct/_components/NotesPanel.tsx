'use client'
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { AuditItemNote } from "../_actions/getAuditItemNotes"
import { AuditItemNoteType } from "../_actions/getAuditItemNoteTypes"
import { createNote } from "../_actions/createNote"
import { getUserId } from "@/actions/users/getUserId"
import { createNoteType } from "../_actions/createNoteType"

const NotesPanel = () => {
    const { item, notes, noteTypes } = useDiscrepancySelection()
    const { getNotes, getNoteTypes } = useDiscrepancyActions()

    const handleNoteAdd = async (data: NoteInputs) => {
        if (!item) return;

        const userId = await getUserId()

        await createNote({
            userId,
            auditItemId: item.id,
            ...data,
        });

        getNotes();
    }

    const handleNoteTypeAdd = async (data: NoteTypeInputs) => {

        await createNoteType({
            ...data,
        });

        getNoteTypes()
    }


    return (
        <Panels.Root>
            <SectionTitle size="small">{item ? `Notes for ${item?.item.name}` : 'No Item Selected'}</SectionTitle >

            <NotesManager<AuditItemNote, AuditItemNoteType>
                notes={notes}
                noteTypes={noteTypes}
                onNoteAdd={handleNoteAdd}
                onNoteTypeAdd={handleNoteTypeAdd}
            />
        </Panels.Root>
    )
}

export default NotesPanel
