import { ExBprStaging } from '@/types/bprStaging'
import React from 'react'

const StagedEntryCard = ({entry}: {entry: ExBprStaging} ) => {
  return (
    <div>
    <h1>{entry.lot.lotNumber} </h1>
    <h1>{entry.quantity} </h1>
    </div>
  )
}

export default StagedEntryCard
