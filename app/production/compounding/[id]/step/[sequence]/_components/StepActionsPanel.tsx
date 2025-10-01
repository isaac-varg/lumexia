"use client"
import { revalidatePage } from '@/actions/app/revalidatePage'
import bprBatchStepActions from '@/actions/production/bprBatchSteps'
import ActionPanel from '@/components/ActionPanel'
import { staticRecords } from '@/configs/staticRecords'
import { bprBatchStepStatuses } from '@/configs/staticRecords/bprBatchStepStatuses'
import { ExBprBatchStep } from '@/types/bprBatchStep'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { useRouter } from 'next/navigation'
import React from 'react'

const StepActionsPanel = ({ isStepCompleted, bprBatchStep, isVerificationRequired }: { isStepCompleted: boolean, bprBatchStep: ExBprBatchStep, isVerificationRequired: boolean }) => {

  const router = useRouter()

  const handleComplete = async () => {
    // if there is not any actionables that require verification then it should be set to completed, otherwise, it should be set to awaiting verification


    const statusId = isVerificationRequired ? bprBatchStepStatuses.primaryVerification : bprBatchStepStatuses.completed;
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
