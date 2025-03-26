'use client'

import { useMbprWizardSelection } from "@/store/mbprWizardSlice";

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

    const { step } = useMbprWizardSelection() // current step


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
            className={`step ${classes.bg[bg]} font-poppins text-xl font-semibold text-neutral-800`}
        >
            {label}
        </li>
    )
}

export default StepLabel
