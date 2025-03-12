'use client'

import Dialog from "@/components/Dialog"
import { useState } from "react"
import NewNoteForm from "./NewNoteForm"
import CreateNoteTypeForm from "./CreateNoteTypeForm"
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes"

type NewNoteDialogProps = {
    noteTypes: PricingExaminationNoteType[]
    examinationId: string
    itemId: string
}

const NewNoteDialog = ({ noteTypes, examinationId, itemId }: NewNoteDialogProps) => {

    const [mode, setMode] = useState<'addNoteType' | 'default'>('default');

    return (
        <Dialog.Root identifier="newrequestnotedialog">
            <div className="flex justify-between items-center">
                <Dialog.Title>{mode === 'default' ? 'Add Note' : 'Create Note Type'}</Dialog.Title>
            </div>


            {mode === 'default' && <NewNoteForm types={noteTypes} examinationId={examinationId} itemId={itemId} setMode={setMode} />}

            {mode === 'addNoteType' && <CreateNoteTypeForm setMode={setMode} />}


        </Dialog.Root>
    )
}

export default NewNoteDialog
