import { revalidatePage } from '@/actions/app/revalidatePage'
import bprStepActionableVerificationActions from '@/actions/production/bprStepActionableVerifications'
import bprStepActionableActions from '@/actions/production/bprStepActionables'
import { getUserId } from '@/actions/users/getUserId'
import ActionButton from '@/components/ActionButton'
import { bprStepActionableStatuses } from '@/configs/staticRecords/bprStepActionableStatuses'
import { ExBprStepActionable } from '@/types/bprStepActionable'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'

const BooleanActionable = ({ bprStepActionable, bprId }: { bprStepActionable: ExBprStepActionable, bprId: string }) => {

  const handleClick = async () => {

    const userId = await getUserId()

    const payload = {
      completedByUserId: userId,
      bprStepActionableId: bprStepActionable.id,
      type: 'primary',
    };

    await bprStepActionableVerificationActions.createNew(payload)

    let statusId = bprStepActionableStatuses.completed

    if (bprStepActionable.stepActionable.secondaryVerificationRequired) {
      statusId = bprStepActionableStatuses.secondaryVerification;
    }



    await bprStepActionableActions.update({ id: bprStepActionable.id }, {
      isVerified: true,
      statusId,
    })

    createActivityLog("VerifyBprActionable", "bpr", bprId, { context: 'Verified BPR batch step actionable.', bprStepActionableId: bprStepActionable.id, })

    revalidatePage("/production/quality/step/[sequence]")
  }

  return (
    <div>
      <ActionButton onClick={() => handleClick()} >Done</ActionButton>
    </div>
  )
}

export default BooleanActionable
