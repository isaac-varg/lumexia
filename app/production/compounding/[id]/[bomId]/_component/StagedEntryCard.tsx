"use client"
import { revalidatePage } from '@/actions/app/revalidatePage'
import bprStagingActions from '@/actions/production/bprStagings'
import { ExBprStaging } from '@/types/bprStaging'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import React from 'react'
import { TbTrash } from 'react-icons/tb'


const StagedEntryCard = ({ entry }: { entry: ExBprStaging }) => {

    const deleteScan = async () => {

        await bprStagingActions.deleteOne({ id: entry.id })
        await createActivityLog("deleteBprStaging", "bprBomId", entry.bprBomId, { context: 'Deleted staging entry' })
        revalidatePage('/production/compounding/[id]/[bomId]')
    }

    return (
        <div className='flex flex-col gap-y-2 p-4 bg-zinc-100 rounded-lg border border-zinc-300'>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-xl text-neutral-900 font-poppins'>{entry.lot.lotNumber} </h1>
                <span className='text-xl' onClick={() => deleteScan()}><TbTrash /></span>
            </div>
            <h1 className='font-semibold text-lg text-neutral-600 font-poppins'>{entry.quantity} lbs</h1>
        </div>
    )
}

export default StagedEntryCard
