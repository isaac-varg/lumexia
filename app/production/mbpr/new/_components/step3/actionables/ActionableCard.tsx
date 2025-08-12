import stepActionableActions from '@/actions/production/stepActionables'
import ActionButton from '@/components/ActionButton'
import useProductionWizard from '@/hooks/useProductionWizard'
import { StepActionable } from '@/types/stepActionable'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'
import { TbX } from 'react-icons/tb'

const ActionableCard = ({ actionable }: { actionable: StepActionable }) => {

  const { selectedBatchStep, selectedMbpr, revalidate } = useProductionWizard();


  const handleDelete = async () => {

    if (!selectedMbpr || !selectedBatchStep) { throw new Error("MBPR or Batch Step not selected") }
    await stepActionableActions.deleteOne({ id: actionable.id });

    await createActivityLog('deleteStepActionable', 'mbpr', selectedMbpr.id, { context: `Deleted actionable from ${selectedBatchStep.phase}.${selectedBatchStep.sequence}`, actionableId: actionable.id })
    revalidate()

  }
  return (
    <div className='flex flex-col gap-y-y border border-cararra-700 rounded-lg p-4'>

      <span className='flex justify-between'>
        <span className='font-poppins font-semibold text-lg'>{actionable.actionableType.name}</span>
        <span><ActionButton color="warning" onClick={() => handleDelete()} ><TbX /></ActionButton></span>
      </span>


      <span className='font-poppins font-semibold text-lg'>{actionable.required ? 'Required' : 'Optional'} </span>

    </div>

  )
}

export default ActionableCard
