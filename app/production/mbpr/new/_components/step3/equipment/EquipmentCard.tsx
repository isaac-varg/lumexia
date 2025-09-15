import stepEquipmentActions from '@/actions/production/stepEquipment'
import ActionButton from '@/components/ActionButton'
import useProductionWizard from '@/hooks/useProductionWizard'
import { StepEquipment } from '@/types/stepEquipment'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'
import { TbX } from 'react-icons/tb'

const EquipmentCard = ({ equipment }: { equipment: StepEquipment }) => {

  const { revalidate, selectedMbpr } = useProductionWizard()

  const handleDelete = async () => {

    if (!selectedMbpr) { throw new Error('MBPR not selected.') }

    await stepEquipmentActions.deleteOne({ id: equipment.id });

    createActivityLog('removeStepEquipment', 'mbpr', selectedMbpr.id, { context: `Removed ${equipment.equipment.name} from batch step` })


    revalidate()

  }

  return (
    <div className='border border-cararra-700 rounded-lg p-4'>

      <span className='flex justify-between'>
        <span className='font-poppins font-semibold text-lg'>{equipment.equipment.name}</span>

        <span><ActionButton color="warning" onClick={() => handleDelete()} ><TbX /></ActionButton></span>
      </span>

    </div>

  )
}

export default EquipmentCard
