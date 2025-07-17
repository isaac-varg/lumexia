'use client'
import { useState } from "react"
import ActionsPanel from "./ActionsPanel"
import InfoPanel from "./InfoPanel"
import TitlePanel from "./TitlePanel"
import { GeneralRequestNote } from "../_actions/getAllGeneralRequestNotes"
import { GeneralRequestNoteType } from "../_actions/getAllGeneralRequestNoteTypes"
import NotesPanel from "./NotesPanel"

type RequestMainProps = {
    notes: GeneralRequestNote[],
    noteTypes: GeneralRequestNoteType[]
    requestId: string
}

const RequestMain = ({ notes, noteTypes, requestId }: RequestMainProps) => {

    const [title, setTitle] = useState<string>('');

    return (
        <div className="flex items-center px-40">
            <div className="grid grid-cols-2 gap-8">

                <ActionsPanel />

                <InfoPanel />

                <TitlePanel onChange={setTitle} value={title} />

                <NotesPanel notes={notes} noteTypes={noteTypes} requestId={requestId} />

            </div>
        </div>
    )
}

export default RequestMain
