'use client'


export type StepLabelProps = {
  indicator: string | number;
  stepNumber: number
  label: string
  currentStep: number
}

const classes = {
  bg: {
    current: 'step-accent',
    future: '',
    past: 'step-neutral',
  }
}

const StepLabel = ({ indicator, stepNumber, label, currentStep }: StepLabelProps) => {



  let bg: keyof typeof classes.bg = 'past'

  if (currentStep === stepNumber) {
    bg = 'current'
  }

  if (currentStep < stepNumber) {
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
