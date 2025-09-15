import { purchasingActions } from "@/actions/purchasing";
import { PoSupplierNote } from "@/actions/purchasing/purchaseOrders/notes/supplier/getAll";
import { PoSupplierNoteType } from "@/actions/purchasing/purchaseOrders/notes/supplier/getAllTypes";
import { getUserId } from "@/actions/users/getUserId";
import Card from "@/components/Card";
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm";
import { NoteInputs } from "@/components/Notes/NotesAddMode";
import NotesManager from "@/components/Notes/NotesManager";
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice";
import { useRouter } from "next/navigation";

const PoSupplierNotes = () => {
  const { poSupplierNotes, options, purchaseOrder } = usePurchasingSelection()
  const { getOptions } = usePurchasingActions()
  const router = useRouter();

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    if (!purchaseOrder) return;
    await purchasingActions.purchaseOrders.notes.supplier.create({
      supplierId: purchaseOrder.supplierId,
      userId,
      content: data.content,
      noteTypeId: data.noteTypeId,
    });

    router.refresh();

  }

  const handleNoteTypeAdd = async (values: NoteTypeInputs) => {
    await purchasingActions.purchaseOrders.notes.supplier.types.create(values)
    getOptions();
  }

  const handleNoteDelete = async (note: PoSupplierNote) => {
    await purchasingActions.purchaseOrders.notes.supplier.delete({ id: note.id });
    router.refresh();
  }


  return (
    <Card.Root>

      <Card.Title>Supplier Purchase Order Notes</Card.Title>
      <p className="font-poppins text-lg text-base-content">These notes will appear on every purchase order associated with {purchaseOrder ? purchaseOrder.supplier.name : 'this supplier'} supplier.</p>

      <NotesManager<PoSupplierNote, PoSupplierNoteType >
        notes={poSupplierNotes}
        noteTypes={options.poSupplierNoteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
        onDelete={handleNoteDelete}
        maxHeight="max"

      />
    </Card.Root>

  )
}

export default PoSupplierNotes
