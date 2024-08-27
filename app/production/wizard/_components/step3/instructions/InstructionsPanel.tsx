import ActionButton from '@/components/ActionButton'
import Text from '@/components/Text'
import React, { useEffect, useState } from 'react'
import { TbPlus } from 'react-icons/tb'
import InstructionsForm from './InstructionsForm'
import useDialog from '@/hooks/useDialog'
import useProductionWizard from '@/hooks/useProductionWizard'
import { StepInstruction } from '@/types/stepInstruction'
import InstructionCard from './InstructionCard'
import { getStepInstructions } from '../../../_functions/getStepInstructions'

const InstructionsPanel = () => {

  const { showDialog } = useDialog()
  const { selectedBatchStep, revalidateTrigger } = useProductionWizard()
  const [stepInstructions, setStepInstructions] = useState<StepInstruction[]>([])

  useEffect(() => {

    const getData = async () => {

      if (!selectedBatchStep) {
        throw new Error("Batch step not selected")
      }
      
      const response = await getStepInstructions(selectedBatchStep.id)
      setStepInstructions(response)
    }

    getData()

  }, [selectedBatchStep, revalidateTrigger])

  return (

    <div className='p-4 bg-cararra-50 rounded-lg h-full flex flex-col gap-y-4'>

      <InstructionsForm instruction={undefined} />
      <div className='flex justify-between'>
        <Text.SectionTitle size='small'>work instructions</Text.SectionTitle>
        <ActionButton color='cararra' onClick={() => showDialog('createNewStepInstruction')}><TbPlus /></ActionButton>
      </div>


      {stepInstructions.map((instruction) => {
        return <InstructionCard key={instruction.id} instruction={instruction} />
      })}
    </div>
  )
}

export default InstructionsPanel
