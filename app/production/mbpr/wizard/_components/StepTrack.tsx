import React from 'react'
import StepLabel from './StepLabel'

const StepTrack = () => {

    const steps = [
        { label: "Item" },
        { label: "Version" },
        { label: "Production"}
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
