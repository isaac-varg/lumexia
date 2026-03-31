import { productionActions } from "@/actions/production"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { useMbprDetailsActions, useMbprDetailsSelection } from "@/store/mbprDetailsSlice"
import { useRouter } from "next/navigation"

const NotesTab = () => {
  const { notes, options, mbpr } = useMbprDetailsSelection()
  const { getOptions } = useMbprDetailsActions()
  const router = useRouter()

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    if (!mbpr) return;
    await productionActions.mbprs.notes.create({
      mbprId: mbpr.id,
      userId,
      content: data.content,
      noteTypeId: data.noteTypeId,
    }, data.fileIds)
    router.refresh();
  }

  const handleNoteTypeAdd = async (values: NoteTypeInputs) => {
    await productionActions.mbprs.notes.types.create(values);
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
