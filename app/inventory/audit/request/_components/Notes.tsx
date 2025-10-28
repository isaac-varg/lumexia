'use client'
import { inventoryActions } from '@/actions/inventory'
import { AuditRequestNoteType } from '@/actions/inventory/auditRequests/noteTypes/getAll'
import { AuditRequestNote } from '@/actions/inventory/getOneAuditRequest'
import { getUserId } from '@/actions/users/getUserId'
import { NoteTypeInputs } from '@/components/Notes/CreateNoteTypeForm'
import { NoteInputs } from '@/components/Notes/NotesAddMode'
import NotesManager from '@/components/Notes/NotesManager'
import { useRouter } from 'next/navigation'
import React from 'react'

const Notes = ({ notes, noteTypes, requestId }: { notes: AuditRequestNote[], noteTypes: AuditRequestNoteType[], requestId: string }) => {
  const router = useRouter()
  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    await inventoryActions.auditReqests.noteTypes.create(data);
    router.refresh()
  }

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    await inventoryActions.auditReqests.notes.create({
      userId,
      requestId,
      ...data
    })
    router.refresh()
  }

  return (<NotesManager<AuditRequestNote, AuditRequestNoteType>
    notes={notes}
    noteTypes={noteTypes}
    onNoteAdd={handleNoteAdd}
    onNoteTypeAdd={handleNoteTypeAdd}

  />

  )
}

export default Notes
