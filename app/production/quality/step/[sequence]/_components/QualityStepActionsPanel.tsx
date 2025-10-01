"use client"
import { revalidatePage } from '@/actions/app/revalidatePage'
import bprBatchStepActions from '@/actions/production/bprBatchSteps'
import ActionPanel from '@/components/ActionPanel'
import useProduction from '@/hooks/useProduction'
import { ExBprBatchStep } from '@/types/bprBatchStep'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { useRouter } from 'next/navigation'
import React from 'react'
import { QualityExBprStepActionable } from './CompletedActionableCard'
import { DateTime } from 'luxon'
import { bprBatchStepStatuses } from '@/configs/staticRecords/bprBatchStepStatuses'

const QualityStepActionsPanel = ({ bprBatchStep, actionables }: { bprBatchStep: ExBprBatchStep, actionables: QualityExBprStepActionable[] }) => {

  const router = useRouter()
  const { isSecondaryVerificationMode } = useProduction()

  console.log(actionables)


  const handleComplete = async () => {


    const secondaryVerificationRequired = actionables.some((act) => act.stepActionable.secondaryVerificationRequired)
    let statusId = isSecondaryVerificationMode ? bprBatchStepStatuses.completed : bprBatchStepStatuses.secondaryVerification;

    if (!secondaryVerificationRequired && !isSecondaryVerificationMode) { statusId = bprBatchStepStatuses.completed }


    await bprBatchStepActions.update({ id: bprBatchStep.id }, { isComplete: true, statusId, completedAt: DateTime.now().toISO() })

    await createActivityLog("completeBprStep", "bpr", actionables[0].bprBatchStep.bprId, { context: `Set bpr batch step status to ${statusId}`, bprBatchStepId: bprBatchStep.id })

    router.back()

  }
  return (
    <div>
      {<ActionPanel onClick={() => handleComplete()}>Complete Step</ActionPanel>}
    </div>
  )
}

export default QualityStepActionsPanel
