import Text from '@/components/Text';
import { BatchStep } from '@/types/batchStep';
import React from 'react';
import BatchStepButton from './BatchStepButton';

type BatchStepData = {
  [key: string]: BatchStep[];
};

const BatchStepList = ({ batchSteps }: { batchSteps: BatchStepData }) => {
  return (
    <div className='flex flex-col gap-y-4 pr-2 overflow-y-auto'>
      {Object.keys(batchSteps).map((phase: string) => (
        <div key={phase} className='flex flex-col gap-y-2'>
          <span className='text-lg font-poppins font-medium uppercase text-neutral-500'>
            Phase {phase}
          </span>
          <div className='flex flex-col gap-y-2'>
            {batchSteps[phase].map((batchStep: BatchStep) => (
              <BatchStepButton key={batchStep.id} batchStep={batchStep} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BatchStepList;

