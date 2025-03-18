import useProductionWizard from '@/hooks/useProductionWizard';
import { BatchStep } from '@/types/batchStep';
import React from 'react'

const BatchStepButton = ({ batchStep }: { batchStep: BatchStep }) => {

  const { setSelectedBatchStep, selectedBatchStep } = useProductionWizard();

  const handleClick = () => {
    setSelectedBatchStep(batchStep);
  }
  const isSelected = selectedBatchStep && selectedBatchStep.id === batchStep.id


  return <div className={`flex gap-x-2 border hover:bg-cararra-300 hover:border-cararra-500 text-neutral-700 py-2 px-4 rounded-lg ${isSelected ? 'bg-cararra-300 border-cararra-400' : 'border-cararra-200 bg-cararra-100'} `} onClick={() => handleClick()}>
    <span className="font-poppins text-lg">{batchStep.sequence} ({batchStep.label})</span>
  </div>
}



export default BatchStepButton
