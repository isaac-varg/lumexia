import { productionActions } from "@/actions/production"
import { BprNote } from "@/actions/production/bprs/notes/getAllByBpr"
import { BprNoteType } from "@/actions/production/bprs/notes/notesTypes/getAll"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { useRouter } from "next/navigation"
import { TbX } from "react-icons/tb"

const Notes = () => {

  const { bpr, bprNoteTypes, bprNotes, } = useProductionSelection()
  const { getBprNoteType, setStagingDetailsMode, setCompoundingDetailsMode, } = useProductionActions()
  const router = useRouter()

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    if (!bpr) return;

    await productionActions.bprs.notes.create({
      bprId: bpr.id,
      userId,
      content: data.content,
      noteTypeId: data.noteTypeId,
    })
    router.refresh()
  }

  const handleNoteTypeAdd = async (values: NoteTypeInputs) => {
    await productionActions.bprs.notes.types.create(values)
    getBprNoteType();
  }

  const handleBack = () => {
    setStagingDetailsMode('main');
    setCompoundingDetailsMode('main');
  }


  return (
    <Card.Root>
      <div className="flex justify-between items-center">
        <Card.Title>Add Note</Card.Title>
        <button onClick={handleBack} className='btn btn-md flex items-center justify-center btn-circle'> <TbX className='size-5' /></button>
      </div>
      <NotesManager<BprNote, BprNoteType>
        notes={bprNotes}
        noteTypes={bprNoteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
        maxHeight="max"
      />

    </Card.Root>
  )
}

export default Notes
