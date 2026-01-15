import { PricingExaminationNote } from "@/actions/accounting/examinations/notes/getAllByExamId";
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes";
import { getUserId } from "@/actions/users/getUserId";
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm";
import { NoteInputs } from "@/components/Notes/NotesAddMode";
import NotesManager from "@/components/Notes/NotesManager"
import { useRouter } from "next/navigation";

const Notes = () => {
  const router = useRouter()

  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    router.refresh()
  }

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
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
