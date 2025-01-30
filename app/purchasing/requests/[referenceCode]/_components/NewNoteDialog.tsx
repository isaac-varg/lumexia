'use client'

import Dialog from "@/components/Dialog"
import { RequestNoteType } from "../_functions/getNoteTypes"
import { useState } from "react"
import NewNoteForm from "./NewNoteForm"
import CreateNoteTypeForm from "./CreateNoteTypeForm"

type NewNoteDialogProps = {
    types: RequestNoteType[]
    requestId: string
}

const NewNoteDialog = ({ types, requestId }: NewNoteDialogProps) => {

    const [mode, setMode] = useState<'addNoteType' | 'default'>('default');

    return (
        <Dialog.Root identifier="newrequestnotedialog">
            <div className="flex justify-between items-center">
                <Dialog.Title>{mode === 'default' ? 'Add Note' : 'Create Note Type'}</Dialog.Title>
                <button className="btn"
                    onClick={() => setMode("addNoteType")}>New Note Type</button>
            </div>


            {mode === 'default' && <NewNoteForm types={types} requestId={requestId} />}

            {mode === 'addNoteType' && <CreateNoteTypeForm setMode={setMode} />}


        </Dialog.Root>
    )
}

export default NewNoteDialog
