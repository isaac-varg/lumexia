import { productionActions } from "@/actions/production"
import bprActions from "@/actions/production/bprActions"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { useBprDetailsActions, useBprDetailsSelection } from "@/store/bprDetailsSlice"
import { useRouter } from "next/navigation"

const NotesTab = () => {
  const { notes, options, bpr } = useBprDetailsSelection()
  const { getOptions } = useBprDetailsActions()
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
    router.refresh();
  }

  const handleNoteTypeAdd = async (values: NoteTypeInputs) => {
    await productionActions.bprs.notes.types.create(values);
    getOptions()
  }


  return (
    <Card.Root>
      <NotesManager
        notes={notes}
        noteTypes={options.noteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
      />
    </Card.Root>
  )
}

export default NotesTab
