import { Panels } from "@/components/Panels";
import Text from "@/components/Text";
import { useState } from "react";
import NotesViewMode from "./NotesViewMode";
import NotesAddMode from "./NotesAddMode";
import CreateNoteTypeForm from "./NotesAddNoteTypeMode";

const NotesPanel = () => {

  const [mode, setMode] = useState<'addType' | 'addNote' | 'view'>('view');

  return (
    <Panels.Root span={2}>
      <div className="flex justify-between items-center">

        <Text.SectionTitle size="small">Notes</Text.SectionTitle>
        {mode === 'view' && <button onClick={() => setMode('addNote')} className="btn btn-neutral btn-soft">Add Note</button>}
      </div>

      {mode === 'view' && <NotesViewMode />}
      {mode === 'addNote' && <NotesAddMode setMode={setMode} />}
      {mode === 'addType' && <CreateNoteTypeForm setMode={setMode} />}

    </Panels.Root>
  )
}

export default NotesPanel
