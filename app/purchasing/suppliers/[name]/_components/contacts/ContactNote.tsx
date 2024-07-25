import { SupplierContactNote } from '@/types/supplierContactNote'
import React from 'react'

const ContactNote = ({note} : { note: SupplierContactNote }) => {
  return (
    <div className=' ml-4 rounded-lg flex flex-row items-center gap-x-2'>
	<div className='h-2 w-2 rounded-full bg-cararra-900'	 />
			<p className='font-inter' >{note.content} </p>
	</div>
  )
}

export default ContactNote
