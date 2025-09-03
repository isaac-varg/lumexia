"use client"
import ActionButton from '@/components/ActionButton'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import { handleBeginStaging } from './actions'

const QueuedPanel = ({ bpr }: { bpr: BatchProductionRecord }) => {

  return (
    <div className='flex flex-col gap-y-6 items-center justify-center'>
      <div className='flex flex-col items-center justify-center font-poppins gap-y-4 text-3xl text-base-content'>
        <p>This batch is scheduled for {bpr.scheduledForStart?.toString() || 'undefined'} </p>
        <p>You can begin staging for this batch by clicking the button below</p>
      </div>

      <form action={() => handleBeginStaging(bpr)}>
        <ActionButton size='large' >Begin Staging</ActionButton>
      </form>
    </div>
  )
}

export default QueuedPanel
