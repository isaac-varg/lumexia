"use client"
import { revalidatePage } from '@/actions/app/revalidatePage'
import bprBatchStepActions from '@/actions/production/bprBatchSteps'
import ActionPanel from '@/components/ActionPanel'
import { ExBprBatchStep } from '@/types/bprBatchStep'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { useRouter } from 'next/navigation'
import React from 'react'

const StepActionsPanel = ({ isStepCompleted, bprBatchStep }: { isStepCompleted: boolean, bprBatchStep: ExBprBatchStep }) => {

    const router = useRouter()
    const handleComplete = async () => {
        await bprBatchStepActions.update({ id: bprBatchStep.id }, { isComplete: true })

        await createActivityLog("completeBprStep", "bpr", bprBatchStep.bprId, { context: `Completed bpr batch step.`, bprBatchStepId: bprBatchStep.id })

        router.back()

    }
    return (
        <div>
            {isStepCompleted && <ActionPanel onClick={() => handleComplete()}>Complete Step</ActionPanel>}
        </div>
    )
}

export default StepActionsPanel
