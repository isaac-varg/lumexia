import React from 'react'

type StepLabelProps = {
  indicator: string;
  currentStep: number
  step: number
  label: string
}

const classes = {
  bg: {
    current: 'step-accent',
    future: '',
    past: 'step-neutral',
  }
}

const StepLabel = ({ indicator, currentStep, step, label }: StepLabelProps) => {

  let bg: keyof typeof classes.bg = 'past'

  if (currentStep === step) {
    bg = 'current'
  }

  if (currentStep < step) {
    bg = 'future'
  }





  return (
    <li
      data-content={indicator}
      className={`step ${classes.bg[bg]} font-poppins text-xl font-semibold text-base-content`}
    >
      {label}
    </li>
  )
}

export default StepLabel
