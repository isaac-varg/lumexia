import { qualityActions } from "@/actions/quality";
import { QcRecordNote } from "@/actions/quality/qc/recordNotes/getAllByRecord";
import { QcRecordNoteType } from "@/actions/quality/qc/recordNotes/types/getAll";
import { getUserId } from "@/actions/users/getUserId";
import Card from "@/components/Card";
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm";
import { NoteInputs } from "@/components/Notes/NotesAddMode";
import NotesManager from "@/components/Notes/NotesManager";
import { useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useRouter } from "next/navigation";

const Notes = () => {

  const { notes, noteTypes, qcRecord } = useQcExaminationSelection()
  const router = useRouter()

  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    await qualityActions.qc.recordNotes.types.create(data);
    router.refresh()
  }

  const handleNoteAdd = async (data: NoteInputs) => {
    if (!qcRecord) return;
    const userId = await getUserId()
    await qualityActions.qc.recordNotes.create({
      userId,
      recordId: qcRecord.id,
      ...data
    })
    router.refresh()
  }

  return (
    <Card.Root>

      <NotesManager<QcRecordNote, QcRecordNoteType>
        notes={notes}
        noteTypes={noteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}

      />

    </Card.Root>
  )
}

export default Notes
