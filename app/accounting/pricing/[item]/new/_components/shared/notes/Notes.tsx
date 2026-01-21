import { accountingActions } from "@/actions/accounting";
import { PricingExaminationNote } from "@/actions/accounting/examinations/notes/getAllByExamId";
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes";
import { getUserId } from "@/actions/users/getUserId";
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm";
import { NoteInputs } from "@/components/Notes/NotesAddMode";
import NotesManager from "@/components/Notes/NotesManager"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice";
import { useRouter, useSearchParams } from "next/navigation";

const Notes = () => {
  const router = useRouter()
  const { notes, noteTypes, examId, item } = usePricingSharedSelection()

  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    await accountingActions.examinations.notes.createNoteType(data);

    router.refresh()
  }

  const handleNoteAdd = async (data: NoteInputs) => {
    if (!item) return;
    const userId = await getUserId()
    await accountingActions.examinations.notes.create({
      userId,
      pricingExaminationId: examId,
      ...data
    }, {
      examinationId: examId,
      examinedItemId: item.id
    })
    router.refresh()
  }
  return (
    <div>

      <NotesManager<PricingExaminationNote, PricingExaminationNoteType>
        notes={notes}
        noteTypes={noteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
      />

    </div>
  )
}

export default Notes
