import { purchasingActions } from "@/actions/purchasing";
import { PoPublicNote } from "@/actions/purchasing/purchaseOrders/notes/public/getAll";
import { PoPublicNoteType } from "@/actions/purchasing/purchaseOrders/notes/public/getAllTypes";
import { getUserId } from "@/actions/users/getUserId";
import Card from "@/components/Card";
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm";
import { NoteInputs } from "@/components/Notes/NotesAddMode";
import NotesManager from "@/components/Notes/NotesManager";
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice";
import { useRouter } from "next/navigation";

const PublicNotes = () => {
  const { publicNotes, options, purchaseOrder } = usePurchasingSelection()
  const { getOptions } = usePurchasingActions()
  const router = useRouter();

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    if (!purchaseOrder) return;
    await purchasingActions.purchaseOrders.notes.public.create({
      purchaseOrderId: purchaseOrder.id,
      userId,
      content: data.content,
      noteTypeId: data.noteTypeId,
    });
    router.refresh()
  }

  const handleNoteTypeAdd = async (values: NoteTypeInputs) => {
    await purchasingActions.purchaseOrders.notes.public.types.create(values)
    getOptions();
  }

  const handleNoteDelete = async (note: PoPublicNote) => {
    await purchasingActions.purchaseOrders.notes.public.delete({ id: note.id });
    router.refresh();
  }


  return (
    <Card.Root >
      <Card.Title>Purchase Order Notes</Card.Title>

      <p className="font-poppins text-lg text-base-content">These notes will appear on the PDF for this specific purchase order.</p>

      <NotesManager<PoPublicNote, PoPublicNoteType >
        notes={publicNotes}
        noteTypes={options.publicNoteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
        onDelete={handleNoteDelete}
        maxHeight="max"

      />
    </Card.Root>

  )
}

export default PublicNotes
