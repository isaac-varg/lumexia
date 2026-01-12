import { Search } from '@/components/Search';
import { usePricingSharedActions, usePricingSharedSelection } from '@/store/pricingSharedSliceback';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TbPlus } from 'react-icons/tb';
import NewConsumerContainer from './NewConsumerContainer';


type SelectContainerStepProps = {
  nextStep: () => void;
  currentStep: number
  setConsumerContainer: Dispatch<SetStateAction<string>>
}


const SelectContainerStep = ({ nextStep, currentStep, setConsumerContainer }: SelectContainerStepProps) => {

  const [mode, setMode] = useState<'default' | 'new'>('default')
  const { consumerContainers } = usePricingSharedSelection();
  const { getAllConsumerContainers } = usePricingSharedActions()


  const handleSelection = (id: string) => {
    setConsumerContainer(id);
    nextStep();
  }


  useEffect(() => {
    if (consumerContainers.length === 0) {
      getAllConsumerContainers();
    }
  }, [mode, consumerContainers.length, getAllConsumerContainers])


  if (currentStep !== 0) { return false }

  if (mode === 'new') {
    return (
      <div>
        <NewConsumerContainer setMode={setMode} />
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-y-4'>
      <p>
        Consumer containers are items that are used to package raw materials, fragrances, or production bases; think liquid gallon. Consumer containers have various attributes associated with them to help with pricing transparency and determination. Please search for an existing consumer container or create a new one.
      </p>
      <div className='flex gap-x-4'>



        <div className='w-3/4'>
          <Search.SearchWithResults
            keys={['name']}
            data={consumerContainers}
            onClick={handleSelection}
            title={false}
          />
        </div>

        <div className='w-1/4'>

          <button
            onClick={() => setMode('new')}
            className='btn'>
            <div className='flex items-center justify-center'>
              <span className='text-2xl'><TbPlus /></span>
              <p>Consumer Container</p>
            </div>
          </button>
        </div>

      </div>
    </div>
  )
}

export default SelectContainerStep
