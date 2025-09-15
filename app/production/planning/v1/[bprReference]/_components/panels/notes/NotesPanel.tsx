'use client'
import { Panels } from "@/components/Panels";
import Text from "@/components/Text";
import { useState } from "react";
import NotesViewMode from "./NotesViewMode";
import NotesAddMode from "./NotesAddMode";
import NoteTypesAddMode from "./NoteTypesAddMode";

const NotesPanel = () => {

  const [mode, setMode] = useState<'addType' | 'addNote' | 'view'>('view');

  return (
    <Panels.Root span={3}>
      <div className="flex justify-between items-center">

        <Text.SectionTitle size="small">Notes</Text.SectionTitle>
        {mode === 'view' && <button onClick={() => setMode('addNote')} className="btn btn-neutral btn-soft">Add Note</button>}
      </div>

      {mode === 'view' && <NotesViewMode />}
      {mode === 'addNote' && <NotesAddMode setMode={setMode} />}
      {mode === 'addType' && <NoteTypesAddMode setMode={setMode} />}

    </Panels.Root>
  )
}

export default NotesPanel
