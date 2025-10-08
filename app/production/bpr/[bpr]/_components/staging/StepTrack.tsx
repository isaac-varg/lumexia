import React from 'react'
import StepLabel from './StepLabel'
import { useTranslation } from '@/hooks/useTranslation'
import { translations } from '../../_configs/translations'
import { TbArrowLeft } from 'react-icons/tb'
import { useProductionActions } from '@/store/productionSlice'

const StepTrack = ({ currentStep }: { currentStep: number }) => {

  const { t } = useTranslation()
  const { setStagingDetailsMode } = useProductionActions()

  const steps = [
    { label: t(translations, 'stagingScanStepTitle') },
    { label: t(translations, 'stagingQuantityStepTitle') },
    { label: t(translations, 'stagingPictureStepTitle') },
  ]

  return (
    <div className='flex items-start justify-between'>
      <div>
        <button onClick={() => setStagingDetailsMode('main')} className='btn btn-outline btn-error'> <TbArrowLeft className='size-4' /> </button>
      </div>
      <ul className="steps w-full ">
        {steps.map((s, index) => <StepLabel key={s.label} stepNumber={index} indicator={index + 1} currentStep={currentStep} label={s.label} />)}
      </ul>
      <div />
    </div>
  )
}

export default StepTrack

