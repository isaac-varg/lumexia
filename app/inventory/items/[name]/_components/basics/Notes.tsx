import { inventoryActions } from "@/actions/inventory"
import { ItemNote } from "@/actions/inventory/items/notes/getAllByItem"
import { ItemNoteType } from "@/actions/inventory/items/notes/types/getAllItemNoteTypes"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { useRouter } from "next/navigation"

const Notes = () => {

  const { notes, options, item } = useItemSelection()
  const { getOptions } = useItemActions()
  const router = useRouter()

  const handleNoteAdd = async (data: NoteInputs) => {
    if (!item) return;
    const userId = await getUserId()
    await inventoryActions.items.notes.create({
      userId,
      itemId: item.id,
      ...data
    });

    router.refresh()
  }

  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    await inventoryActions.items.notes.types.create(data);
    getOptions()

  }

  return (
    <Card.Root span={2}>

      <Card.Title>Notes</Card.Title>

      <NotesManager<ItemNote, ItemNoteType>
        notes={notes}
        noteTypes={options.noteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
      />

    </Card.Root>
  )
}

export default Notes
