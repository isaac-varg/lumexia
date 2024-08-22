import ActionButton from '@/components/ActionButton'
import Text from '@/components/Text'
import useDialog from '@/hooks/useDialog'
import React from 'react'
import { TbPlus } from 'react-icons/tb'

const EquipmentPanel = () => {
  const { showDialog } = useDialog();

  return (
    <div className='p-4 bg-cararra-50 rounded-lg h-full flex flex-col gap-y-4'>

      <div className='flex justify-between'>
        <Text.SectionTitle size='small'>Equipment</Text.SectionTitle>
        <ActionButton color='cararra' onClick={() => showDialog('createNewStepInstruction')}><TbPlus /></ActionButton>
      </div>


    </div>

  )
}

export default EquipmentPanel
