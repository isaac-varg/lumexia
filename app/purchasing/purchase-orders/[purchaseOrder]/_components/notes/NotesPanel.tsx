import React from 'react'
import NotesTable from './NotesTable'
import { PONote } from '../../_functions/getOrderNotes'

type NotesPanelProps = {
    notes: PONote[]
    poId: string
}

const NotesPanel = ({ notes, poId }: NotesPanelProps) => {

    return (
        <NotesTable notes={notes} poId={poId} />
    )
}

export default NotesPanel
