import { QcRecordNote } from "@/actions/quality/qc/recordNotes/getAllByRecord";
import Card from "@/components/Card";
import SectionTitle from "@/components/Text/SectionTitle";
import NotesViewMode from "@/components/Notes/ViewMode";

const NotesView = ({ notes }: { notes: QcRecordNote[] }) => {
  return (
    <Card.Root>
      <div className="flex flex-col gap-y-6">
        <SectionTitle size="small">Notes</SectionTitle>

        {notes.length === 0 ? (
          <p className="font-medium text-xl text-base-content/50 font-poppins">
            No notes recorded for this examination.
          </p>
        ) : (
          <NotesViewMode notes={notes} maxHeight="max" />
        )}
      </div>
    </Card.Root>
  );
};

export default NotesView;
