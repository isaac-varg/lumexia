import { DateTime } from "luxon";
import { TbGhost2, TbTrash, TbFileTypePdf } from "react-icons/tb";
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
        const imageFiles = note.files?.filter(f => f.file.mimeType.startsWith('image/')) || []
        const audioFiles = note.files?.filter(f => f.file.mimeType.startsWith('audio/')) || []
        const pdfFiles = note.files?.filter(f => f.file.mimeType === 'application/pdf') || []

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

            {imageFiles.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {imageFiles.map((nf) => (
                  <a
                    key={nf.id}
                    href={nf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={nf.thumbnailUrl || nf.url}
                      alt={nf.file.name}
                      className="h-24 w-24 object-cover rounded-lg border border-base-300 hover:opacity-80 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            )}

            {pdfFiles.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {pdfFiles.map((nf) => (
                  <a
                    key={nf.id}
                    href={nf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {nf.thumbnailUrl ? (
                      <img
                        src={nf.thumbnailUrl}
                        alt={nf.file.name}
                        className="h-24 w-24 object-cover rounded-lg border border-base-300 hover:opacity-80 transition-opacity"
                      />
                    ) : (
                      <div className="h-24 w-24 flex flex-col items-center justify-center gap-y-1 rounded-lg border border-base-300 bg-base-200 hover:opacity-80 transition-opacity">
                        <TbFileTypePdf className="text-2xl text-error" />
                        <span className="text-xs text-base-content/60 font-poppins truncate max-w-20 px-1">{nf.file.name}</span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}

            {audioFiles.length > 0 && (
              <div className="flex flex-col gap-y-2">
                {audioFiles.map((nf) => (
                  <div key={nf.id} className="flex items-center gap-x-2">
                    <audio controls className="h-8" preload="metadata">
                      <source src={nf.url} type={nf.file.mimeType} />
                    </audio>
                    <span className="text-sm text-base-content/60 font-poppins">{nf.file.name}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        )
      })}
    </div>

  )
}

export default NotesViewMode
