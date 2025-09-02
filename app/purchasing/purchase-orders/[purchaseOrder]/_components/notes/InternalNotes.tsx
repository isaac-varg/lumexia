import { purchasingActions } from "@/actions/purchasing"
import { PoInternalNote } from "@/actions/purchasing/purchaseOrders/notes/interal/getAll"
import { PoInternalNoteType } from "@/actions/purchasing/purchaseOrders/notes/interal/getAllInternalNoteTypes"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm"
import { NoteInputs } from "@/components/Notes/NotesAddMode"
import NotesManager from "@/components/Notes/NotesManager"
import { usePurchasingSelection } from "@/store/purchasingSlice"

const InternalNotes = () => {
  const { internalNotes, options, purchaseOrder } = usePurchasingSelection()
  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    if (!purchaseOrder) return;
    await purchasingActions.purchaseOrders.notes.internal.create({
      purchaseOrderId: purchaseOrder.id,
      userId,
      content: data.content,
      noteTypeId: data.noteTypeId,
    });
  }

  const handleNoteTypeAdd = async (values: NoteTypeInputs) => {
    await purchasingActions.purchaseOrders.notes.internal.types.create(values)
  }


  return (
    <Card.Root span={2}>

      <p className="font-poppins text-lg text-base-content">Internal notes are notes that will not appear on any purchase order PDFs and are for internal use only.</p>

      <NotesManager<PoInternalNote, PoInternalNoteType>
        notes={internalNotes}
        noteTypes={options.internalNoteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
        maxHeight="max"

      />
    </Card.Root>
  )
}

export default InternalNotes
