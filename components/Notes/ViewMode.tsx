import { DateTime } from "luxon";
import { TbGhost2, TbTrash } from "react-icons/tb";
import { Note } from "@/types/note";

interface ViewModeProps<TNote extends Note> {
  notes: TNote[];
  onDelete?: (note: TNote) => Promise<void>;
  maxHeight?: NotesManagerHeight
}

const classes = {
  maxHeight: {
    small: 'max-h-72',
    max: '',
  }
}

export type NotesManagerHeight = keyof typeof classes.maxHeight;

const NotesViewMode = <TNote extends Note>({ notes, onDelete, maxHeight = 'small' }: ViewModeProps<TNote>) => {

  return (
    <div className={`grid grid-cols-1 gap-4 ${classes.maxHeight[maxHeight]} overflow-y-auto`}>
      {notes.map((note) => {
        return (
          <div key={note.id} className='flex flex-col gap-y-4 bg-base-200/40 p-6 rounded-xl'>

            <div className='flex flex-row justify-between items-center'>
              <div className="flex flex-row gap-x-4 items-center">
                <div className='bg-secondary/50 flex items-center gap-x-2 rounded-xl px-4 py-2'>

                  <span className='text-xl'><TbGhost2 /></span>
                  <h3 className='font-poppins text-base font-medium'>{note.user.name}</h3>
                </div>

                <div
                  style={{ backgroundColor: note.noteType.bgColor, color: note.noteType.textColor }}
                  className={`font-poppins font-medium text-sm rounded-xl py-2 px-4 `}
                >
                  <h3 className='font-poppins font-medium text-sm'>{note.noteType.name}</h3>
                </div>

                <div className='font-poppins text-base font-medium'>
                  {DateTime.fromJSDate(note.createdAt).toFormat('DDDD @ t')}
                </div>
              </div>
              {onDelete && (
                <button
                  className="btn btn-error btn-soft btn-sm"
                  onClick={() => onDelete(note)}
                >
                  <TbTrash />
                </button>
              )}
            </div>


            <div className='font-poppins text-lg'>
              {note.content}
            </div>


          </div>
        )
      })}
    </div>

  )
}

export default NotesViewMode
