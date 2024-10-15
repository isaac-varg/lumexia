"use client"
import { revalidatePage } from '@/actions/app/revalidatePage'
import bprBatchStepActions from '@/actions/production/bprBatchSteps'
import ActionPanel from '@/components/ActionPanel'
import { staticRecords } from '@/configs/staticRecords'
import { ExBprBatchStep } from '@/types/bprBatchStep'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { useRouter } from 'next/navigation'
import React from 'react'

const StepActionsPanel = ({ isStepCompleted, bprBatchStep, isVerificationRequired }: { isStepCompleted: boolean, bprBatchStep: ExBprBatchStep , isVerificationRequired: boolean}) => {

    const router = useRouter()

    const handleComplete = async () => {

        // changing how this is done for now
        // const { fulfillStep, verify, secondaryVerification, completed } = staticRecords.production.bprBatchStepStatuses
        // switch (bprBatchStep.statusId) {
        //     case fulfillStep:
        //         statusId = verify;
        //         break;
        //     case verify:
        //         statusId = secondaryVerification;
        //         break;
        //     case secondaryVerification:
        //         statusId = completed;
        //         break;
        //     default:
        //         throw new Error("Current status not found in flow.")
        // }
        //

        // if there is not any actionables that require verification then it should be set to completed, otherwise, it should be set to awaiting verification
        
        
        const statusId = isVerificationRequired ? staticRecords.production.bprBatchStepStatuses.verify : staticRecords.production.bprBatchStepStatuses.completed;
        const isComplete = isVerificationRequired ? false : true;


        await bprBatchStepActions.update({ id: bprBatchStep.id }, { isComplete, statusId, })

        await createActivityLog("completeBprStep", "bpr", bprBatchStep.bprId, { context: `Set bpr batch step status to ${statusId}`, bprBatchStepId: bprBatchStep.id })

        router.back()

    }
    return (
        <div>
            {isStepCompleted && <ActionPanel onClick={() => handleComplete()}>Complete Step</ActionPanel>}
        </div>
    )
}

export default StepActionsPanel
