import React from 'react'
import StepLabel from './StepLabel'
import { useTranslation } from '@/hooks/useTranslation'
import { translations } from '../../_configs/translations'

const StepTrack = ({ currentStep }: { currentStep: number }) => {

  const { t } = useTranslation()

  const steps = [
    { label: t(translations, 'stagingScanStepTitle') },
    { label: t(translations, 'stagingQuantityStepTitle') },
    { label: t(translations, 'stagingPictureStepTitle') },
  ]

  return (
    <div>
      <ul className="steps w-full ">
        {steps.map((s, index) => <StepLabel key={s.label} stepNumber={index} indicator={index + 1} currentStep={currentStep} label={s.label} />)}
      </ul>
    </div>
  )
}

export default StepTrack

