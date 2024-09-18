import ActionButton from '@/components/ActionButton'
import { ExBprStaging } from '@/types/bprStaging'
import React from 'react'
import StagedEntryCard from './StagedEntryCard'


const ScanHistory = ( { setIsViewMode , stagings} : { setIsViewMode: (isViewMode: boolean) => void , stagings: any}) => {

  const handleAdd = () => {
   setIsViewMode(false) 
  }
  return (
    <div>
    <ActionButton onClick={() => handleAdd()}>Add New</ActionButton>
    {stagings.map((entry: ExBprStaging) => <StagedEntryCard entry={entry} />)}   
    </div>
  )
}

export default ScanHistory
