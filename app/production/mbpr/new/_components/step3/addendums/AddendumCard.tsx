import stepAddendumActions from '@/actions/production/stepAddendums'
import ActionButton from '@/components/ActionButton'
import useProductionWizard from '@/hooks/useProductionWizard'
import { StepAddendum } from '@/types/stepAddendum'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { Action } from '@radix-ui/react-toast'
import React from 'react'
import { TbX } from 'react-icons/tb'

const AddendumCard = ({ addendum }: { addendum: StepAddendum }) => {

  const { selectedMbpr, revalidate } = useProductionWizard();

  const handleDelete = async () => {

    if (!selectedMbpr) {
      throw new Error("MBPR not selected.")
    }

    await stepAddendumActions.deleteOne({ id: addendum.id })

    createActivityLog("removeStepAddendum", 'mbpr', selectedMbpr.id, { context: `Step addendum removed: ${addendum.content}` })

    revalidate()
  }
  return (
    <div className='border border-cararra-700 rounded-lg p-4 flex flex-col gap-y-2'>
      <div className='flex justify-between'>
        <span className='font-poppins font-semibold text-lg text-neutral-600'>{addendum.addendumType.name}</span>
        <ActionButton color='warning' onClick={() => handleDelete()} ><TbX /> </ActionButton>
      </div>
      <span className='font-poppins font-semibold text-lg'>{addendum.content}</span>

    </div>

  )
}

export default AddendumCard
