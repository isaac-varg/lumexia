"use client"
import Table from '@/components/Table'
import { SupplierNote } from '@/types/SupplierNote'
import { DateTime } from 'luxon'
import React from 'react'
import NotesForm from './NotesForm'
import useDialog from '@/hooks/useDialog'
import ActionButton from '@/components/ActionButton'
import { Supplier } from '@/types/supplier'
import SectionTitle from '@/components/Text/SectionTitle'

const NotesTable = ( { data , supplier } : { data: SupplierNote[], supplier: Supplier}) => {

  const { showDialog } = useDialog();
  const headers = ["Created At", "Content"]

  const notes = data.map(note => {
    return [DateTime.fromJSDate(note.createdAt).toFormat('DD @t'), note.content]
  });

  const handleRowClick = () => {
   console.log('clicked') 
  }

  return (
 <>
 <NotesForm supplier={supplier} />
 
 <div className='flex flex-col gap-y-4'>
  <SectionTitle>Notes</SectionTitle>
 <span>

 <ActionButton onClick={() => showDialog('createNote')}>Add New</ActionButton>
 </span>

<Table.Root headers={headers} data={notes} onRowClick={handleRowClick} /> 
 </div>
 </> 
  )
}

export default NotesTable