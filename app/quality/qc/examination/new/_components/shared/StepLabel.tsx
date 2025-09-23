'use client'

import { useQcExaminationSelection } from "@/store/qcExaminationSlice";


export type StepLabelProps = {
  indicator: string | number;
  stepNumber: number
  label: string
}

const classes = {
  bg: {
    current: 'step-accent',
    future: '',
    past: 'step-neutral',
  }
}

const StepLabel = ({ indicator, stepNumber, label }: StepLabelProps) => {

  const { step } = useQcExaminationSelection()


  let bg: keyof typeof classes.bg = 'past'

  if (step === stepNumber) {
    bg = 'current'
  }

  if (step < stepNumber) {
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
