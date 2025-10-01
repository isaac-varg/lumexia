"use client"
import ActionPanel from '@/components/ActionPanel'
import Layout from '@/components/Layout'
import { staticRecords } from '@/configs/staticRecords'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import { updateCompletedBprCascade } from '../_functions/updateCompletedBprCascade'
import { useRouter } from 'next/navigation'
import { revalidatePage } from '@/actions/app/revalidatePage'
import useDialog from '@/hooks/useDialog'
import { bprStatuses } from '@/configs/staticRecords/bprStatuses'

const ActionsPanel = ({
  bpr,
}: {
  bpr: BatchProductionRecord,
}) => {

  const router = useRouter()
  const { showDialog } = useDialog()
  const isBprCompleted = bpr.bprStatusId === bprStatuses.completed


  const handleComplete = async () => {
    await updateCompletedBprCascade(bpr.id)
    revalidatePage("/production/planning")
    router.back()
  }

  return (
    <div className='flex justify-between'>
      <div className='flex gap-x-2'>
        <button className='btn btn-neutral' onClick={() => showDialog('changeBprStatus')}>Change Status</button>
      </div>
      <div>
        {isBprCompleted && <ActionPanel onClick={() => handleComplete()}>Complete</ActionPanel>}
      </div>

    </div>
  )
}

export default ActionsPanel
