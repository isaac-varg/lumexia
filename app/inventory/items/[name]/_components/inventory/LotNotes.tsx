import { createLotNote } from "@/actions/inventory/lots/notes/create"
import { LotNote } from "@/actions/inventory/lots/notes/getAllByLot"
import { createLotNoteType } from "@/actions/inventory/lots/notes/types/create"
import { LotNoteType } from "@/actions/inventory/lots/notes/types/getAll"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { useRouter } from "next/navigation"

const LotNotes = () => {

  const router = useRouter()
  const { selectedLotNotes, options, selectedLot } = useItemSelection()
  const { getOptions, getSelectedLotNotes } = useItemActions()
  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    await createLotNoteType(data);
    getOptions()

  }


  const handleNoteAdd = async (data: NoteInputs) => {

    if (!selectedLot) return;
    const userId = await getUserId()
    await createLotNote({
      userId,
      lotId: selectedLot.id,
      ...data
    })

    getSelectedLotNotes()

  }

  return (
    <Card.Root>
      <Card.Title>Lot Notes</Card.Title>

      <NotesManager<LotNote, LotNoteType>
        notes={selectedLotNotes}
        noteTypes={options.lotNoteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}

      />

    </Card.Root>
  )
}

export default LotNotes
