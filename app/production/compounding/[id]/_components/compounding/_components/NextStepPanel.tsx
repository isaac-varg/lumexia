import { ExBprBatchStep } from '@/types/bprBatchStep'
import { sortByProperty } from '@/utils/data/sortByProperty'
import React from 'react'
import { getCurrentStep } from '../_functions/getCurrentStep'
import Card from '@/components/Card'
import StepCard from './StepCard'

const NextStepPanel = async ({ steps }: { steps: ExBprBatchStep[] }) => {


    const sortedSteps = sortByProperty(steps, "batchStep.sequence")
    const currentStep = await getCurrentStep(sortedSteps)

    return (
        <Card.Root>
            <Card.Title>Current Step</Card.Title>
            <StepCard step={currentStep as any} isReadOnly={false} />
        </Card.Root>
    )
}

export default NextStepPanel
