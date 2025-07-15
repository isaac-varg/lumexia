'use client'
import { Panels } from "@/components/Panels";
import Text from "@/components/Text";
import { useState } from "react";
import NotesAddMode from "./NotesAddMode";
import { AccountingNote } from "../../_actions/getAllAccountingNotes";
import { PoAccountingNoteType } from "@prisma/client";
import NotesViewMode from "./NotesViewMode";
import CreateNoteTypeForm from "./CreateNoteTypeForm";

const AccountingNotes = ({ notes, noteTypes, poId }: { notes: AccountingNote[], noteTypes: PoAccountingNoteType[], poId: string }) => {

    const [mode, setMode] = useState<'addType' | 'addNote' | 'view'>('view');

    return (
        <Panels.Root span={3}>
            <div className="flex justify-between items-center">

                <Text.SectionTitle size="small">Notes</Text.SectionTitle>
                {mode === 'view' && <button onClick={() => setMode('addNote')} className="btn">Add Note</button>}
            </div>

            {mode === 'view' && <NotesViewMode notes={notes} />}
            {mode === 'addNote' && <NotesAddMode poId={poId} noteTypes={noteTypes} setMode={setMode} />}
            {mode === 'addType' && <CreateNoteTypeForm setMode={setMode} />}

        </Panels.Root>
    )
}

export default AccountingNotes
