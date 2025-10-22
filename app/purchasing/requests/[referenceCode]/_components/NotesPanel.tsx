'use client'
import useDialog from '@/hooks/useDialog'
import React from 'react'
import { TbGhost2, TbPlus, TbUser } from 'react-icons/tb'
import { RequestNoteType } from '../_functions/getNoteTypes'
import { RequestNote } from '../_functions/getRequestNotes'
import { DateTime } from 'luxon'
import SectionTitle from '@/components/Text/SectionTitle'
import Card from '@/components/Card'

const NotesPanel = ({ notes, noteTypes }: { notes: RequestNote[], noteTypes: RequestNoteType[] }) => {

  const { showDialog } = useDialog()

  return (
    <div className='flex flex-col gap-2'>


      <div className='flex justify-between items-center'>
        <SectionTitle>Recent Notes</SectionTitle>
        <button className='btn btn-secondary flex items-center' onClick={() => showDialog('newrequestnotedialog')}>
          <span className='size-4'> <TbPlus /></span>
          New Note
        </button>

      </div>


      <Card.Root>
        <div className='grid grid-cols-1 gap-4 max-h-72 overflow-y-auto'>
          {notes.map((note) => {
            return (
              <div key={note.id} className='flex flex-col gap-y-4 bg-accent/35 p-6 rounded-xl'>

                <div className='flex flex-row justify-start gap-x-4 items-center'>

                  <div className='bg-secondary/40 flex items-center gap-x-2 rounded-xl px-4 py-2'>

                    <span className='text-xl'><TbGhost2 /></span>
                    <h3 className='font-poppins text-base font-medium'>{note.user.name}</h3>
                  </div>

                  <div
                    style={{ backgroundColor: note.noteType.bgColor, color: note.noteType.textColor }}
                    className={`font-poppins font-medium text-sm rounded-xl py-2 px-4 `}
                  >
                    <h3 className='font-poppins font-medium text-sm text-shadow-base-content'>{note.noteType.name}</h3>
                  </div>

                  <div className='font-poppins font-medium text-base text-base-content'>
                    {DateTime.fromJSDate(note.createdAt).toFormat('DDDD @ t')}
                  </div>

                </div>

                <div className='font-poppins text-lg text-base-content'>
                  {note.content}
                </div>


              </div>
            )
          })}
        </div>
      </Card.Root>
    </div>
  )
}

export default NotesPanel
