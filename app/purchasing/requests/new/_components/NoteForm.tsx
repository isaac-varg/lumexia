import React, { Dispatch, SetStateAction } from 'react'
import { RequestNoteType } from '../../[referenceCode]/_functions/getNoteTypes'
import { useForm } from 'react-hook-form'
import { TagSelectOptions } from '@/components/Form/TagSelect'
import Form from '@/components/Form'
import { InterimNote } from './MainPanel'
import { requestNoteTypes } from '@/configs/staticRecords/requestNoteTypes'

type Inputs = {
  noteTypeId: string
  content: string
}


const NoteForm = ({ types, setNotes, setMode }: { types: RequestNoteType[], setNotes: Dispatch<SetStateAction<InterimNote[]>>, setMode: Dispatch<SetStateAction<'addNoteType' | 'default' | 'show'>> }) => {


  const form = useForm<Inputs>({ defaultValues: { noteTypeId: requestNoteTypes.general } });


  const typeOptions: TagSelectOptions[] = types.map((type) => {
    return { value: type.id, label: type.name, bgColor: type.bgColor, textColor: type.textColor }
  });


  const handleSubmit = async (data: Inputs) => {

    const { noteTypeId, content } = data

    setNotes((prev) => ([...prev, { noteTypeId, content, }]))
    setMode('show')

  }

  const handleAddNewType = () => {
    setMode('addNoteType')
  }

  return (
    <div className='flex flex-col gap-y-6'>

      <Form.Root form={form} onSubmit={handleSubmit} >

        <Form.TextArea form={form} fieldName="content" label="Note" required />

        <Form.TagSelect form={form} fieldName="noteTypeId" onAddNew={handleAddNewType} label="Type" options={typeOptions} />


        <div className='flex flex-row justify-end gap-x-2'>
          <button className='btn btn-warning' onClick={() => setMode('show')}>Cancel</button>

          <button className='btn btn-success' type='submit'>Submit</button>
        </div>


      </Form.Root>
    </div>

  )
}

export default NoteForm
