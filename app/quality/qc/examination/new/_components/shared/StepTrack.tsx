import React from 'react'
import StepLabel from './StepLabel'

const StepTrack = () => {

  const steps = [
    { label: "Lot" },
    { label: "Type" },
    { label: "Examination" }
  ]

  return (
    <div>

      <ul className="steps w-full ">
        {steps.map((s, index) => <StepLabel key={s.label} stepNumber={index} indicator={index + 1} label={s.label} />)}
      </ul>
    </div>
  )
}

export default StepTrack
