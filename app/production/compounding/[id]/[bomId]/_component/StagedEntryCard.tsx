import { ExBprStaging } from '@/types/bprStaging'
import React from 'react'

const StagedEntryCard = ({entry}: {entry: ExBprStaging} ) => {
  return (
    <div className='flex flex-col gap-y-2 p-4 bg-zinc-100 rounded-lg border border-zinc-300'>
    <h1 className='font-semibold text-xl text-neutral-900 font-poppins'>{entry.lot.lotNumber} </h1>
    <h1 className='font-semibold text-lg text-neutral-600 font-poppins'>{entry.quantity} lbs</h1>
    </div>
  )
}

export default StagedEntryCard
