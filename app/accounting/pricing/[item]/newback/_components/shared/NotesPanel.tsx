'use client'
import { TbGhost2, TbPlus } from "react-icons/tb"
import { DateTime } from "luxon"
import useDialog from "@/hooks/useDialog"
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes"
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSliceback"
import Card from "@/components/Card"
import NewNoteDialog from "./NewNoteDialog"


const NotesPanel = ({ noteTypes, examinationId, itemId }: { noteTypes: PricingExaminationNoteType[], examinationId: string, itemId: string }) => {

  const { showDialog } = useDialog()

  const { examinationNotes } = usePricingSharedSelection()
  const { getExaminationNotes } = usePricingSharedActions()



  return (
    <div className="col-span-2">

      <NewNoteDialog noteTypes={noteTypes} examinationId={examinationId} itemId={itemId} />

      <Card.Root>

        <Card.Title>Notes</Card.Title>
        <div className="flex flex-col gap-y-4">

          <div className='flex justify-start items-center'>

            <button className='btn' onClick={() => showDialog('newrequestnotedialog')}>
              <span className='text-xl'> <TbPlus /></span>
              <h2>New Note</h2>
            </button>
          </div>


          <div className='grid grid-cols-1 gap-4 '>
            {examinationNotes.map((note) => {
              return (
                <div key={note.id} className='flex flex-col gap-y-4 bg-lilac-100 p-6 rounded-xl'>

                  <div className='flex flex-row justify-start gap-x-4 items-center'>

                    <div className='bg-lilac-300 flex items-center gap-x-2 rounded-xl px-4 py-2'>

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


                  <div className='font-poppins text-lg'>
                    {note.content}
                  </div>


                </div>
              )
            })}
          </div>

        </div>
      </Card.Root>
    </div>
  )
}

export default NotesPanel 
