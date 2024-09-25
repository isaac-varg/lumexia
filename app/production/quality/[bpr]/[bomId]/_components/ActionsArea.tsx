import ActionPanel from '@/components/ActionPanel'
import React from 'react'

const ActionsArea = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <ActionPanel>Add Note</ActionPanel>
      <ActionPanel>Complete</ActionPanel>

    </div>
  )
}

export default ActionsArea
