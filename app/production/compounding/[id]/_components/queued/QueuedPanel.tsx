"use client"
import { revalidatePage } from '@/actions/app/revalidatePage'
import bprActions from '@/actions/production/bprActions'
import ActionButton from '@/components/ActionButton'
import { staticRecords } from '@/configs/staticRecords'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'

const QueuedPanel = async ({ bpr }: { bpr: BatchProductionRecord }) => {

    const handleButton = async () => {
        
         await bprActions.update({id: bpr.id}, {bprStatusId: staticRecords.production.bprStatuses.stagingMaterials})
         await createActivityLog("upateBprStatus", "bpr" , bpr.id, {context: `BPR #${bpr.releasedAt} was set to staging from the queued panel`})
         revalidatePage("/production/compounding/[id]/")
    }

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center'>
            <div className='flex flex-col items-center justify-center font-poppins gap-y-4 text-3xl text-neutral-800'>
                <p>This batch is scheduled for {bpr.scheduledForStart?.toString() || 'undefined'} </p>
                <p>You can begin staging for this batch by clicking the button below</p>
            </div>

            <ActionButton size='large' onClick={() => handleButton()}>Begin Staging</ActionButton>
        </div>
    )
}

export default QueuedPanel
