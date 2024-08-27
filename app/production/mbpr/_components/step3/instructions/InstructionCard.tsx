import { StepInstruction } from '@/types/stepInstruction'
import React from 'react'

const InstructionCard = ({ instruction }: { instruction: StepInstruction }) => {
  return (
    <div className='border border-cararra-700 rounded-lg p-4'>

      <span className='font-poppins font-semibold text-lg'>{instruction.instructionContent}</span>

    </div>

  )
}

export default InstructionCard
