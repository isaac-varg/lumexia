import { revalidatePage } from '@/actions/app/revalidatePage'
import bprStepActionableCompletionActions from '@/actions/production/bprStepActionableCompletions'
import bprStepActionableActions from '@/actions/production/bprStepActionables'
import { getUserId } from '@/actions/users/getUserId'
import ActionButton from '@/components/ActionButton'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { DateTime } from 'luxon'
import React from 'react'

const BooleanActionable = ({ bprStepActionableId, bprId }: {bprStepActionableId: string, bprId: string }) => {
    const handleClick = async (isComplete: boolean) => {
        
        const userId = await getUserId()
        const timestamp = DateTime.now().toISO()

        const payload = {
            completedByUserId: userId,
            bprStepActionableId,
            completedAt: timestamp,
            value: isComplete.toString(),
        };

        const completion = await bprStepActionableCompletionActions.createNew(payload) 

        await bprStepActionableActions.update({ id: bprStepActionableId}, {
            isComplete,
        }) 

        createActivityLog("completeBprActionable", "bpr", bprId, {context: 'Completed BPR batch step actionable.', bprStepActionableId, } )
        
        revalidatePage("/production/compounding/[id]/step/[sequence]")
    }

    return (
        <div>
            <ActionButton onClick={ ( ) => handleClick(true)} >Done</ActionButton>
    </div>
    )
}

export default BooleanActionable
