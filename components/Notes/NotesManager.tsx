'use client'
import Text from "@/components/Text";
import { useState } from "react";
import NotesViewMode, { NotesManagerHeight } from "./ViewMode";
import { Note, NoteType } from "@/types/note";
import NotesAddMode, { NoteInputs } from "./NotesAddMode";
import CreateNoteTypeForm, { NoteTypeInputs } from "./CreateNoteTypeForm";


interface NotesManagerProps<TNote extends Note, TNoteType extends NoteType> {
  notes: TNote[];
  noteTypes: TNoteType[];
  onNoteAdd: (note: NoteInputs) => Promise<void>;
  onNoteTypeAdd: (noteType: NoteTypeInputs) => Promise<void>;
  maxHeight?: NotesManagerHeight
}

const NotesManager = <TNote extends Note, TNoteType extends NoteType>({ notes, noteTypes, onNoteAdd, onNoteTypeAdd, maxHeight = 'small' }: NotesManagerProps<TNote, TNoteType>) => {

  const [mode, setMode] = useState<'addType' | 'addNote' | 'view'>('view');

  return (
    <div>
      <div className="flex justify-between items-center">

        <Text.SectionTitle size="small">Notes</Text.SectionTitle>
        {mode === 'view' && <button onClick={() => setMode('addNote')} className="btn btn-neutral btn-soft">Add Note</button>}
      </div>

      {mode === 'view' && <NotesViewMode<TNote> notes={notes} maxHeight={maxHeight} />}

      {mode === 'addNote' && onNoteAdd && <NotesAddMode<TNoteType> onNoteAdd={onNoteAdd} noteTypes={noteTypes} setMode={setMode} />}
      {mode === 'addType' && onNoteTypeAdd && <CreateNoteTypeForm onNoteTypeAdd={onNoteTypeAdd} setMode={setMode} />}

    </div>
  )
}

export default NotesManager
